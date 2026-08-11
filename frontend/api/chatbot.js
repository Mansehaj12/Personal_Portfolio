const SYSTEM_PROMPT = `
You are the AI Recruiter & Technical Assistant for Mansehaj Preet Singh's personal portfolio website.
Your mission is to synthesize user and recruiter queries into structured, actionable, and clear responses in real-time.

PORTFOLIO CONTEXT & KNOWLEDGE BASE:
- **Full Name**: Mansehaj Preet Singh
- **Current Education**: Bachelor of Engineering (B.E.) in Computer Engineering (COE) at Thapar Institute of Engineering and Technology (TIET), Patiala, Punjab. Expected graduation: May 2027.
- **Target Roles**: Open & actively seeking Quality Engineering, Software Engineering, or Data Science / Machine Learning Internships.
- **Key Projects**:
  1. **Capstone Project: Scenario-Based ODD Safety Framework for Autonomous Vehicles**: Perception-to-action safety pipeline for autonomous vehicles in Indian road environments (IDD-Lite). Integrates PyTorch SegNet semantic segmentation (AMP CUDA acceleration), YOLOv8 object detection, GPU weather perturbation simulations (fog/rain/contrast), and an interactive Leaflet.js dashboard evaluating real-time 18-feature Operational Design Domain (ODD) safety metrics and SAE Level 3 disengagement rules.
  2. **CareerLens**: AI-powered job market intelligence & placement probability SaaS with interactive what-if simulation dials & PDF resume gap analyzers (Ridge Regression, Decision Trees).
  3. **MediSmart**: AI-assisted e-pharmacy platform & generic medicine swap portal using Tesseract.js OCR and Recharts, enabling users to swap brand-name drugs for generic equivalents and save up to 80%.
  4. **PowerMRO**: Industrial simulation platform in Next.js & Recharts simulating live equipment telemetry data to calculate Remaining Useful Life (RUL).
  5. **GameIQ**: ML player analytics dashboard built with Python/Flask predicting mobile user churn with 86.8% accuracy on 90,000+ gamer dataset.
  6. **Robust Weather & Environmental Dashboard**: Responsive asynchronous weather dashboard fetching environmental metrics via OpenWeather REST API with input-guard caching via localStorage.
  7. **Real-Time Financial Converter Engine**: Web application utilizing ExchangeRate API to execute real-time currency conversions across 150+ international assets with 4-decimal precision.
- **Technical Skills**:
  - Languages: Python, JavaScript, C/C++, SQL, Java, R, C# (.NET)
  - Data Science & ML: Pandas, NumPy, Scikit-learn, PyTorch, XGBoost, Random Forest, Exploratory Data Analysis (EDA)
  - Backend & APIs: Node.js, Express, Flask, FastAPI, REST APIs, Google Gemini API
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

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body || {};

  if (!message || message.trim() === '') {
    return res.status(400).json({ reply: "Hello! I am Mansehaj's portfolio assistant. Feel free to type a question or select a quick option." });
  }

  const fallbackKey = Buffer.from('QUl6YVN5QVJybld0a0RnYnVhWFhHS3NBd1NYeEJRNFFUN2NDdGtn', 'base64').toString('utf-8');
  let geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey || geminiKey.trim() === '' || geminiKey.trim().startsWith('AQ.') || geminiKey.includes('your_gemini')) {
    geminiKey = fallbackKey;
  }
  let geminiErrorDebug = "";

  if (geminiKey && geminiKey.trim() !== '' && !geminiKey.includes('your_gemini')) {
    // 1. Query Google Gemini AI API (100% FREE FOREVER)
    try {
      const contentsPayload = [];

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

      const geminiModel = process.env.GEMINI_MODEL || 'gemini-flash-latest';
      const headers = { 'Content-Type': 'application/json' };
      let url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent`;

      if (geminiKey.trim().startsWith('AQ.')) {
        headers['Authorization'] = `Bearer ${geminiKey.trim()}`;
        headers['x-goog-api-key'] = geminiKey.trim();
      } else {
        url += `?key=${geminiKey.trim()}`;
      }

      let response = await fetch(url, {
        method: 'POST',
        headers,
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

      // If rate limited (HTTP 429), wait 1.2s and retry once
      if (response.status === 429) {
        await new Promise(resolve => setTimeout(resolve, 1200));
        response = await fetch(url, {
          method: 'POST',
          headers,
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
      }

      if (response.ok) {
        const data = await response.json();
        const geminiReply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (geminiReply) {
          return res.status(200).json({
            reply: geminiReply.trim(),
            poweredBy: 'Google Gemini AI'
          });
        }
      } else {
        const errText = await response.text();
        console.error(`Gemini API Error ${response.status}:`, errText);
        geminiErrorDebug = `Gemini HTTP ${response.status}`;
      }
    } catch (geminiErr) {
      console.error('Gemini fetch error:', geminiErr.message);
      geminiErrorDebug = `Gemini Err: ${geminiErr.message}`;
    }
  } else {
    geminiErrorDebug = "GEMINI_API_KEY missing in Vercel Env Vars";
  }

  // 2. Fallback Smart Rule Engine
  const lower = message.toLowerCase();
  let reply = "";

  if (lower.includes('project') || lower.includes('capstone') || lower.includes('odd') || lower.includes('careerlens') || lower.includes('gameiq') || lower.includes('powermro') || lower.includes('medismart') || lower.includes('weather') || lower.includes('currency') || lower.includes('code') || lower.includes('build')) {
    reply = "Mansehaj has built several impressive engineering and data science projects: \n" +
            "1. **Capstone Project: Scenario-Based ODD Safety Framework**: Perception-to-action safety pipeline for autonomous driving on Indian road environments combining PyTorch SegNet semantic segmentation, YOLOv8, GPU weather perturbation simulations, and Leaflet.js ODD scoring engine.\n" +
            "2. **CareerLens**: An AI-powered job market intelligence and predictive placement SaaS with real-time what-if simulation dials and PDF resume gap analyzers.\n" +
            "3. **MediSmart**: An AI-assisted e-pharmacy platform & generic medicine swap portal using Tesseract.js OCR and Recharts, enabling users to swap brand-name drugs for generic equivalents and save up to 80%.\n" +
            "4. **PowerMRO**: An industrial simulation platform in Next.js & Recharts simulating live equipment telemetry data to calculate Remaining Useful Life (RUL).\n" +
            "5. **GameIQ**: An ML player analytics dashboard built with Python/Flask predicting mobile user churn with 86.8% accuracy on a dataset of 90,000+ gamers.\n" +
            "6. **Robust Weather & Environmental Dashboard**: Asynchronous API tracker fetching environmental metrics via OpenWeather REST API with input-guard localStorage caching.\n" +
            "7. **Real-Time Financial Converter Engine**: Web application executing real-time currency conversions across 150+ international assets.\n" +
            "Which of these projects would you like to know more about?";
  } 
  else if (lower.includes('skill') || lower.includes('language') || lower.includes('stack') || lower.includes('python') || lower.includes('javascript') || lower.includes('c++') || lower.includes('sql') || lower.includes('java')) {
    reply = "Mansehaj is highly skilled across multiple developer stacks:\n" +
            "• **Languages**: Python, JavaScript, C/C++, SQL, R, Java, C# (.NET)\n" +
            "• **Data Science & ML**: Pandas, NumPy, Scikit-learn, PyTorch, Random Forest, XGBoost, Exploratory Data Analysis (EDA)\n" +
            "• **Backend & APIs**: Node.js, Express, Flask, FastAPI, REST APIs, Google Gemini API\n" +
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
            "• Mansehaj's projects like *Capstone ODD Framework*, *CareerLens*, *PowerMRO*, or *GameIQ*\n" +
            "• His programming languages and Machine Learning skills\n" +
            "• His education at Thapar Institute (TIET)\n" +
            "• His Kaggle ranking or competitive programming statistics\n" +
            "• How to hire him or contact him directly!";
  }

  return res.status(200).json({ 
    reply, 
    poweredBy: geminiErrorDebug ? `Smart Rule Matching (${geminiErrorDebug})` : 'Smart Rule Matching' 
  });
}
