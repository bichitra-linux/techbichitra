import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { IncomingMessage } from "http";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: { url?: string }) => {
  if (req.url === undefined) {
    const errorMessage = "URL is missing!";
    return new NextResponse(JSON.stringify({ message: errorMessage }), { status: 400 });
  }

  // Use optional chaining to access searchParams safely
  const searchParams = new URL(req.url)?.searchParams;

  // Check if searchParams exists after creating URL
  if (!searchParams) {
    console.error("Failed to create URL search params");
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }), { status: 500 }
    );
  }

  const page = parseInt(searchParams.get("page") || "1") || 1;
  const cat = searchParams.get("cat");

  const POST_PER_PAGE = 2;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat ? { catSlug: cat } : {}),
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);
    return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }), { status: 500 }
    );
  }
};

// CREATE A POST
export const POST = async (req: NextApiRequest) => {
  const session = await getAuthSession();

  if (!session || !session.user) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }), { status: 401 }
    );
  }

  try {
    const body = req.body;
    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }), { status: 500 }
    );
  }
};