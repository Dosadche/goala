import { useForm } from "react-hook-form";
import Card from "../../ui/Card";
import Input from "../../ui/Input";
import type { SignInForm } from "../../interfaces/sign-in-form.interface";
import Button, { ButtonType } from "../../ui/Button";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase.ts";
import { collection, getDocs } from "firebase/firestore";

export default function SignIn() {
  const { register, formState } = useForm<SignInForm>({ mode: "onChange" });

  // TEMPORARY CODE
  const tasksColRef = collection(db, "tasks");
  // TEMPORARY CODE

  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <Card>
        <div className="w-[300px] flex flex-col items-center">
          <h3 className="font-semibold text-lg">Sign In</h3>
          <form className="flex flex-col gap-2 w-full">
            <Input
              {...register("email", {
                required: "This field is required",
              })}
              errorMessage={formState.errors.email?.message}
              label="Email"
              placeholder="example@gmail.com"
            />
            <Input
              {...register("password", {
                required: "This field is required",
              })}
              errorMessage={formState.errors.password?.message}
              label="Password"
              type="password"
            />
          </form>
          <div className="w-full mt-4 flex justify-between items-center gap-2">
            <p className="text-sm">
              Don't have an account yet?
              <Link
                to="/auth/sign-up"
                className="text-(--goala-blue)! font-semibold! cursor-pointer"
              >
                Register
              </Link>
            </p>
            <Button type={ButtonType.Secondary}>Confirm</Button>
          </div>
          <button
            onClick={async () => {
              const collData = (await getDocs(tasksColRef)).docs?.map(
                (doc) => ({ ...doc.data(), id: doc.id }),
              );
              console.log(":: colData", collData);
            }}
          >
            Get Tasks
          </button>
        </div>
      </Card>
    </section>
  );
}
