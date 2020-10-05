import ejs = require("ejs");
import { User } from "src/entities";

export const createFromField = (name: string, email: string): string => `"${name}" <${email}>`

export const createLink =  (href: string, caption: string): string => `<a
  href="${href}"
  style="color:#4030E8;font-weight:normal;text-decoration:underline"
  target="_blank">${caption}</a>`;


export const createForgotPasswordEmail = async (user: User): Promise<string> => {
  const data = {
    title: "Reset you password",
    bannerImage: "https://via.placeholder.com/196x100?text=logo",
    headerNotice: "You're getting this email because you're awesome. Also because someone reset your password.",
    paragraphs: [
      `Someone requested a password reset for your account: ${createLink(`mailto:${user.email}`, user.email)}`,
      "If you did not request a password reset, just ignore this email and nothing will happen.",
      "To reset your password, click the button below:"
    ],
    resetCaption: "Choose a new password",
    resetURL: `${process.env.PUBLIC_URL}user/reset/${user.code}`,
    footer: "Next Level is a React community dedicated to creating quality projects.",
    copyright: "Copyright © 2020 Next Level, All rights reserved."
  };
  return new Promise((resolve, reject) => {
    ejs.renderFile(process.cwd() + "/src/templates/email.forgot.template.ejs", data, {}, function(err, html){
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
}

