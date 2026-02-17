import { useForm } from "react-hook-form";
import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Button, { ButtonType } from "../../ui/Button";
import { Link } from "react-router-dom";
import type { SignUpForm } from "../../interfaces/sign-up-form.interface";

export default function SignUp() {
  const { register, formState } = useForm<SignUpForm>({ mode: "onChange" });
  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <Card>
        <div className="w-[300px] flex flex-col items-center gap-1">
          <h3 className="font-semibold text-lg">Sign Up</h3>
          <form className="flex flex-col gap-2 w-full">
            <div className="flex items-base gap-4">
              <Input
                {...register("firstName", {
                  required: "This field is required",
                })}
                errorMessage={formState.errors.firstName?.message}
                label="First Name"
              />
              <Input
                {...register("lastName", {
                  required: "This field is required",
                })}
                errorMessage={formState.errors.lastName?.message}
                label="Last Name"
              />
            </div>
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
            <Input
              {...register("confirmPassword", {
                required: "This field is required",
              })}
              errorMessage={formState.errors.confirmPassword?.message}
              label="Confirm Password"
              type="password"
            />
          </form>
          <div className="w-full mt-4 flex justify-between items-center gap-2">
            <p className="text-sm">
              Already have an account?
              <Link
                to="/auth/sign-in"
                className="text-(--goala-blue)! font-semibold! cursor-pointer text-nowrap"
              >
                Log in
              </Link>
            </p>
            <Button type={ButtonType.Secondary}>Confirm</Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
