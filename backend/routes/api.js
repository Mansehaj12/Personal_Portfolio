const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

// ----------------------------------------------------
// HELPER: Read/Write Local JSON Database Fallback
// ----------------------------------------------------
function readFallbackDb(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading fallback DB:', err.message);
    return { messages: [], visitors: 0 };
  }
}

function writeFallbackDb(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing fallback DB:', err.message);
  }
}

// ----------------------------------------------------
// 1. CONTACT FORM ENDPOINT
// ----------------------------------------------------
router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  const { isMongoConnected, MessageModel, fallbackDbPath } = req.db;

  // Basic Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  let savedMessage = null;

  try {
    if (isMongoConnected) {
      // Save to MongoDB
      const newMessage = new MessageModel({ name, email, subject, message });
      savedMessage = await newMessage.save();
    } else {
      // Save to local JSON file
      const db = readFallbackDb(fallbackDbPath);
      savedMessage = {
        id: Date.now().toString(),
        name,
        email,
        subject,
        message,
        date: new Date().toISOString()
      };
      db.messages.push(savedMessage);
      writeFallbackDb(fallbackDbPath, db);
    }

    // Try sending email via Nodemailer
    await sendContactNotificationEmail(name, email, subject, message);

    return res.status(201).json({
      success: true,
      message: 'Message stored and notification sent successfully!',
      data: savedMessage
    });
  } catch (error) {
    console.error('Contact endpoint error:', error);
    // If it's just email failure but saved successfully, we still return success
    return res.status(201).json({
      success: true,
      message: 'Message saved successfully! (Notification email delivery failed).',
      data: savedMessage
    });
  }
});

// Nodemailer function
async function sendContactNotificationEmail(name, email, subject, message) {
  const smtpUser = process.env.EMAIL_USER;
  const smtpPass = process.env.EMAIL_PASS;
  const receiverEmail = process.env.RECEIVER_EMAIL || 'sehajpreetsingh480@gmail.com';

  if (!smtpUser || !smtpPass || smtpUser.includes('your_email')) {
    console.log('Skipping email notification (SMTP credentials not configured in .env).');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  const mailOptions = {
    from: `"Portfolio Contact Form" <${smtpUser}>`,
    to: receiverEmail,
    subject: `Portfolio: ${subject} - from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px;">
        <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #6366f1; border-radius: 4px; margin-top: 10px; font-style: italic;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #888; text-align: center; border-top: 1px solid #eee; padding-top: 10px;">
          Sent automatically from Mansehaj Preet Singh's Portfolio Server
        </p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
  console.log('📧 Notification email sent to:', receiverEmail);
}

// ----------------------------------------------------
// 2. VISITOR COUNTER ENDPOINT
// ----------------------------------------------------
// Since we want this to be simple and lightweight, we will use a separate small model in MongoDB or local JSON
const visitorSchema = new mongoose.Schema({
  id: { type: String, default: 'visitor_count' },
  count: { type: Number, default: 0 }
});
const VisitorModel = mongoose.model('Visitor', visitorSchema);

router.get('/visitor', async (req, res) => {
  const { isMongoConnected, fallbackDbPath } = req.db;

  try {
    if (isMongoConnected) {
      let doc = await VisitorModel.findOne({ id: 'visitor_count' });
      if (!doc) {
        doc = new VisitorModel({ id: 'visitor_count', count: 0 });
      }
      doc.count += 1;
      await doc.save();
      return res.json({ count: doc.count });
    } else {
      const db = readFallbackDb(fallbackDbPath);
      db.visitors = (db.visitors || 0) + 1;
      writeFallbackDb(fallbackDbPath, db);
      return res.json({ count: db.visitors });
    }
  } catch (error) {
    console.error('Visitor error:', error);
    return res.json({ count: 128 }); // Safe static number in case of error
  }
});

// ----------------------------------------------------
// 3. AI CHATBOT ENDPOINT (Powered by OpenAI LLM + Smart Fallback)
// ----------------------------------------------------
const SYSTEM_PROMPT = `
You are the AI Recruiter & Technical Assistant for Mansehaj Preet Singh's personal portfolio website.
Your mission is to synthesize user and recruiter queries into structured, actionable, and clear responses in real-time.

PORTFOLIO CONTEXT & KNOWLEDGE BASE:
- **Full Name**: Mansehaj Preet Singh
- **Current Education**: Bachelor of Engineering (B.E.) in Computer Engineering (COE) at Thapar Institute of Engineering and Technology (TIET), Patiala, Punjab. Expected graduation: May 2027.
- **Target Roles**: Open & actively seeking Quality Engineering, Software Engineering, or Data Science / Machine Learning Internships.
- **Key Projects**:
  1. **CareerLens**: AI-powered job market intelligence & placement probability SaaS with interactive what-if simulation dials & PDF resume gap analyzers (Ridge Regression, Decision Trees).
  2. **MediSmart**: AI-assisted e-pharmacy platform & generic medicine swap portal using Tesseract.js OCR and Recharts, enabling users to swap brand-name drugs for generic equivalents and save up to 80%.
  3. **PowerMRO**: Industrial simulation platform in Next.js & Recharts simulating live equipment telemetry data to calculate Remaining Useful Life (RUL).
  4. **GameIQ**: ML player analytics dashboard built with Python/Flask predicting mobile user churn with 86.8% accuracy on 90,000+ gamer dataset.
- **Technical Skills**:
  - Languages: Python, JavaScript, C/C++, SQL, Java, R, C# (.NET)
  - Data Science & ML: Pandas, NumPy, Scikit-learn, PyTorch, XGBoost, Random Forest, Exploratory Data Analysis (EDA)
  - Backend & APIs: Node.js, Express, Flask, FastAPI, REST APIs, OpenAI API
  - Frontend & Viz: React.js, Next.js, Tailwind CSS, Recharts, Framer Motion
  - Databases: MySQL, PostgreSQL, MongoDB
- **Key Achievements**:
  - Kaggle Expert tier status (globally ranked competitor, 80% progress towards Kaggle Master).
  - NVIDIA Deep Learning Institute (DLI) Certified in Fundamentals of Deep Learning.
  - Solved 200+ advanced DSA problems on LeetCode & GeeksforGeeks.
- **Contact Details**:
  - Email: sehajpreetsingh480@gmail.com
  - Phone: +91-78886-55097
  - LinkedIn: https://linkedin.com/in/mansehajpreet
  - GitHub: https://github.com/Mansehaj12

RESPONSE GUIDELINES:
- Be enthusiastic, professional, structured, and concise (under 180 words unless explicitly asked for detail).
- Use Markdown bold headers and bullet points for readability.
- If recruiters ask why they should hire Mansehaj, highlight his dual expertise in Web Development + Data Science/ML, Kaggle Expert credentials, and strong problem-solving mindset.
- Always provide actionable contact info (email / contact form) when relevant.
`;

router.post('/chatbot', async (req, res) => {
  const { message, history } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ reply: "Hello! I am Mansehaj's portfolio assistant. Feel free to type a question or select a quick option." });
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;

  // 1. Try Google Gemini AI API (100% FREE FOREVER from aistudio.google.com)
  if (geminiKey && geminiKey.trim() !== '' && !geminiKey.includes('your_gemini')) {
    try {
      console.log('[Chatbot] Invoking 100% Free Google Gemini API...');
      const contentsPayload = [];

      // Format conversation history for Gemini
      if (Array.isArray(history) && history.length > 0) {
        history.slice(-4).forEach(item => {
          if (item.role && item.content) {
            contentsPayload.push({
              role: item.role === 'user' ? 'user' : 'model',
              parts: [{ text: item.content }]
            });
          }
        });
      }

      contentsPayload.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const geminiModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiKey.trim()}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: contentsPayload,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 350
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const geminiReply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (geminiReply) {
          return res.json({
            reply: geminiReply.trim(),
            poweredBy: 'Google Gemini AI'
          });
        }
      } else {
        const errorText = await response.text();
        console.warn(`Gemini API error ${response.status}:`, errorText);
      }
    } catch (geminiErr) {
      console.error('Gemini fetch error (falling through):', geminiErr.message);
    }
  }

  // 2. Try OpenAI API if key exists
  if (openAiKey && openAiKey.trim() !== '' && !openAiKey.includes('your_openai')) {
    try {
      console.log('[Chatbot] Invoking OpenAI API...');
      const messagesPayload = [
        { role: 'system', content: SYSTEM_PROMPT }
      ];

      if (Array.isArray(history) && history.length > 0) {
        history.slice(-4).forEach(item => {
          if (item.role && item.content) {
            messagesPayload.push({ role: item.role, content: item.content });
          }
        });
      }

      messagesPayload.push({ role: 'user', content: message });

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAiKey.trim()}`
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          messages: messagesPayload,
          max_tokens: 350,
          temperature: 0.7
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiReply = data.choices?.[0]?.message?.content;
        if (aiReply) {
          return res.json({ 
            reply: aiReply.trim(), 
            poweredBy: 'OpenAI LLM' 
          });
        }
      } else {
        const errorBody = await response.text();
        console.warn(`OpenAI API status ${response.status}:`, errorBody);
      }
    } catch (err) {
      console.error('OpenAI fetch error (falling back to keyword engine):', err.message);
    }
  }

  // Fallback Rule-Based Engine
  const lower = message.toLowerCase();
  let reply = "";

  if (lower.includes('project') || lower.includes('careerlens') || lower.includes('gameiq') || lower.includes('powermro') || lower.includes('medismart') || lower.includes('weather') || lower.includes('currency') || lower.includes('code') || lower.includes('build')) {
    reply = "Mansehaj has built several impressive engineering and data science projects: \n" +
            "1. **CareerLens**: An AI-powered job market intelligence and predictive placement SaaS with real-time what-if simulation dials and PDF resume gap analyzers.\n" +
            "2. **MediSmart**: An AI-assisted e-pharmacy platform & generic medicine swap portal using Tesseract.js OCR and Recharts, enabling users to swap brand-name drugs for generic equivalents and save up to 80%.\n" +
            "3. **PowerMRO**: An industrial simulation platform in Next.js & Recharts simulating live equipment telemetry data to calculate Remaining Useful Life (RUL).\n" +
            "4. **GameIQ**: An ML player analytics dashboard built with Python/Flask predicting mobile user churn with 86.8% accuracy on a dataset of 90,000+ gamers.\n" +
            "Which of these projects would you like to know more about?";
  } 
  else if (lower.includes('skill') || lower.includes('language') || lower.includes('stack') || lower.includes('python') || lower.includes('javascript') || lower.includes('c++') || lower.includes('sql') || lower.includes('java')) {
    reply = "Mansehaj is highly skilled across multiple developer stacks:\n" +
            "• **Languages**: Python, JavaScript, C/C++, SQL, R, Java, C# (.NET)\n" +
            "• **Data Science & ML**: Pandas, NumPy, Scikit-learn, PyTorch, Random Forest, XGBoost, Exploratory Data Analysis (EDA)\n" +
            "• **Backend & APIs**: Node.js, Express, Flask, FastAPI, REST APIs, OpenAI API\n" +
            "• **Frontend & Viz**: Next.js, React.js, Tailwind CSS, Recharts, Matplotlib, Seaborn\n" +
            "• **Databases**: MySQL, PostgreSQL, MongoDB\n" +
            "He is also certified by the NVIDIA Deep Learning Institute!";
  }
  else if (lower.includes('education') || lower.includes('study') || lower.includes('college') || lower.includes('university') || lower.includes('thapar') || lower.includes('tiet')) {
    reply = "Mansehaj is currently a Bachelor of Engineering student in **Computer Engineering (COE)** at **Thapar Institute of Engineering and Technology (TIET)** in Patiala, Punjab. His graduation date is **May 2027**.\n" +
            "Prior to TIET, he completed his Class 12th under PSEB at GSSS Mulepur in 2023, and Class 10th under CBSE at Budha Dal Public School Patiala in 2021.";
  }
  else if (lower.includes('intern') || lower.includes('hire') || lower.includes('job') || lower.includes('work') || lower.includes('recruit') || lower.includes('open')) {
    reply = "Yes! Mansehaj is actively looking for **Quality Engineering, Software Engineering, or Data Science/Machine Learning internships**. He is eager to bring his rigorous Python and JS skills, testing proficiency, and predictive modeling expertise to a fast-paced development team. You can contact him directly using the Contact Form or email him at **sehajpreetsingh480@gmail.com**.";
  }
  else if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('social') || lower.includes('linkedin') || lower.includes('github') || lower.includes('kaggle')) {
    reply = "You can connect with Mansehaj via:\n" +
            "• ✉ **Email**: sehajpreetsingh480@gmail.com\n" +
            "• 📞 **Phone**: +91-78886-55097\n" +
            "• 🔗 **LinkedIn**: [linkedin.com/in/mansehajpreet](https://linkedin.com/in/mansehajpreet)\n" +
            "• 💻 **GitHub**: [github.com/Mansehaj12](https://github.com/Mansehaj12)\n" +
            "• 📊 **Kaggle**: Kaggle Expert tier dataset/notebook competitor.\n" +
            "You can also send a direct message via the contact form on this website!";
  }
  else if (lower.includes('kaggle') || lower.includes('expert') || lower.includes('certification') || lower.includes('nvidia') || lower.includes('dsa') || lower.includes('leetcode')) {
    reply = "Mansehaj's key achievements include:\n" +
            "• **Kaggle Expert**: Achieved Expert status globally on Kaggle, currently at 80% progress towards the Kaggle Master tier.\n" +
            "• **NVIDIA DLI**: Certified by NVIDIA Deep Learning Institute in the Fundamentals of Deep Learning.\n" +
            "• **Competitive Programming**: Solved 200+ advanced Data Structures and Algorithms problems across LeetCode & GFG, demonstrating robust logical and problem-solving skills.";
  }
  else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('greetings')) {
    reply = "Hello! I am Mansehaj's portfolio chatbot assistant. I'm here to help you navigate his work. Ask me anything about his **projects**, **technical skills**, **education**, **Kaggle status**, or **how to contact him**.";
  }
  else if (lower.includes('ok') || lower.includes('okay') || lower.includes('thanks') || lower.includes('thank') || lower.includes('got it') || lower.includes('cool') || lower.includes('great') || lower.includes('awesome')) {
    reply = "You're welcome! Feel free to ask any other questions about Mansehaj's projects, technical skills, or how to get in touch with him.";
  }
  else {
    reply = "I'm not sure I fully understand that question, but I'd love to help! You can ask me about:\n" +
            "• Mansehaj's projects like *CareerLens*, *PowerMRO*, or *GameIQ*\n" +
            "• His programming languages and Machine Learning skills\n" +
            "• His education at Thapar Institute (TIET)\n" +
            "• His Kaggle ranking or competitive programming statistics\n" +
            "• How to hire him or contact him directly!";
  }

  return res.json({ reply, poweredBy: 'Smart Rule Matching' });
});

module.exports = router;
