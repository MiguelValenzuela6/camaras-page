"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@camaras/ui/src/lib/utils";
import { Button } from "@camaras/ui/src/components/button";
import { Input } from "@camaras/ui/src/components/input";
import { Label } from "@camaras/ui/src/components/label";
import { toast } from "sonner";
import { signInWithGoogle, signInWithEmailAndPassword } from "@/utils/auth-connection";
import { RegisterForm } from "./register-form";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(email, password);
      toast.success("¡Inicio de sesión exitoso!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error en login:", error);
      toast.error(error instanceof Error ? error.message : "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <button
              type="button"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </button>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" variant="landing" className="w-full" disabled={isLoading}>
          {isLoading ? "INICIANDO SESIÓN..." : "LOGIN"}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={async () => {
            try {
              await signInWithGoogle();
              toast.success("¡Inicio de sesión con Google exitoso!");
              router.push("/");
              router.refresh();
            } catch (error) {
              console.error("Error en login con Google:", error);
              toast.error("Error al iniciar sesión con Google");
            }
          }}
          disabled={isLoading}
        >
          <svg
            width="256"
            height="262"
            viewBox="0 0 256 262"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
            color="currentColor"
            aria-label="Google logo"
          >
            <path
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              fill="currentColor"
            />
            <path
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              fill="currentColor"
            />
            <path
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              fill="currentColor"
            />
            <path
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              fill="currentColor"
            />
          </svg>
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Al iniciar sesión, aceptas los términos y condiciones de uso.
      </div>

      <RegisterForm />
    </form>
  );
}
