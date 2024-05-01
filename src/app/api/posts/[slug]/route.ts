import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

interface Params {
  slug: string;
}

interface MyFunctionParams {
  params: Params;
}

// GET SINGLE POST
export const GET = async (req: Request, { params }: MyFunctionParams) => {
  const { slug } = params;

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }), { status: 500 }
    );
  }
};