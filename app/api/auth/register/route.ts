import { MakeRegister, checkByEmail } from "@/utils/models/register";
import { setCrypt } from "@/utils/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { full_name, email, password } = await request.json();
  //todo check fullname - email - pass length
  const check = await checkByEmail(email);
  if (check) {
    return NextResponse.json(
      { ok: false, message: "User already exist" },
      { status: 400 }
    );
  }
  const hashedPass = setCrypt(password);
  const data = await MakeRegister(full_name, email, hashedPass);
  if (!data) {
    return NextResponse.json(
      {
        ok: false,
        message: "Interval server error. Please try again later",
      },
      { status: 500 }
    );
  }

  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: "moobileyazilim@gmail.com",
  //     pass: "mnkx xgco vmic xkfs",
  //   },
  // });

  // await transporter.sendMail(
  //   {
  //     from: "moobileyazilim@gmail.com",
  //     to: email,
  //     subject: "Register authentication",
  //     html: `
  //   <html>
  //             <head>
  //                 <style>
  //                 .container {
  //                     text-align: center;
  //                     padding-top: 50px;
  //                     height: 100vh;
  //                     display: flex;
  //                     flex-direction: column;
  //                     justify-content: center;
  //                     align-items: center;
  //                 }

  //                 .logo {
  //                     /* Logo stil düzenlemeleri */
  //                 }

  //                 .title {
  //                     /* Title stil düzenlemeleri */
  //                 }

  //                 .code {
  //                     /* Code stil düzenlemeleri */
  //                     font-size: 48px;
  //                     font-weight: bold;
  //                 }

  //                 .footer {
  //                     /* Footer stil düzenlemeleri */
  //                     margin-top: auto;
  //                 }
  //                 </style>
  //             </head>
  //             <body>
  //                 <div class="container">
  //                     <img src='${process.env.DOMAIN}/logo/logo.svg' alt="Logo" class="logo">
  //                     <h1 class="title">Atakan Register Authentication Email</h1>
  //                     <p class="code">https://test-git-master-atakaneliz.vercel.app/${data._id}</p>
  //                     <p class="footer">Bu linki kimseyle paylaşmayın.</p> 
  //                 </div>
  //             </body>
  //         </html>
  //       `,
  //   },
  //   function (error, info) {
  //     if (error) {
  //       console.log(error);
  //       return null;
  //     } else {
  //       console.log("Email sent: " + info.response);
  //       return true;
  //     }
  //   }
  // );

  return NextResponse.json(
    {
      ok: true,
      message: "Register successfully!",
      data: data,
    },
    { status: 200 }
  );
}
