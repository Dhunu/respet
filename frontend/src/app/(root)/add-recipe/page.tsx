import { Metadata } from "next";

import AddRecipeForm from "@/components/add-recipe/AddRecipeForm";
import Image from "next/image";
import { redirect } from "next/navigation";
import { authStatus } from "@/actions/auth";

export const metadata: Metadata = {
    title: "Add Recipe",
    description: "Add a new recipe to the collection",
};

export default async function AddRecipe() {
    const res = await authStatus();

    console.log(res);

    if (res.status !== 200) redirect("/auth/sign-in");

    const email = res.body.user?.email;
    return (
        <div className="w-full px-10 sm:px-20 lg:px-32">
            <h2 className="text-2xl sm:text-[5vw] mb-10 font-semibold text-primary w-2/3 relative pt-32">
                <span className="z-10">Add Recipe</span>
                <Image
                    src="/images/brush-stroke.svg"
                    alt="brush stroke"
                    height={50}
                    width={300}
                    className="absolute -bottom-0 sm:-bottom-2 lg:-bottom-6 xl:-bottom-12 left-5 sm:left-[2rem] w-1/2 -z-10"
                />
            </h2>
            <div className="my-10 md:my-32  rounded-lg bg-[#B5C18E] p-5 md:p-20">
                <AddRecipeForm email={email!} />
            </div>
        </div>
    );
}
