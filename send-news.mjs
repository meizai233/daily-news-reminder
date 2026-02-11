import fetch from "node-fetch";
import nodemailer from "nodemailer";

const res = await fetch("https://60s.xxx.xx/v2/60s");
const json = await res.json();

const { date, news, tip } = json.data;

const content = `
📅 ${date}

${news.map((n, i) => `${i + 1}. ${n}`).join("\n")}

💡 ${tip}
`;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, // 应用专用密码
  },
});

await transporter.sendMail({
  from: `"Daily News" <${process.env.MAIL_USER}>`,
  to: process.env.MAIL_TO,
  subject: `📰 今日 60s 新闻`,
  text: content,
});

console.log("mail sent");
