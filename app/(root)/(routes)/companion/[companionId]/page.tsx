import { redirect } from "next/navigation";
import { auth, redirectToSignIn } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";

import { CompanionForm } from "./components/companion-form";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
};

const CompanionIdPage = async ({
  params
}: CompanionIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const validSubscription = await checkSubscription();

  // if (!validSubscription) {
  //   return redirect("/");
  // }
  //console.log(params)
  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
      userId,
    }
  });
  //console.log(companion)

  const categories = await prismadb.category.findMany();
 // console.log(categories)

  return ( 
    <CompanionForm initialData={companion} categories={categories} />
  );
}
 
export default CompanionIdPage;
