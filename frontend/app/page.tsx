import { redirect } from "next/navigation";

/**
 * Root route — redirects to the onboarding flow.
 * The original GestureTranslator is accessible at /sign-camera.
 */
export default function RootPage() {
  redirect("/onboarding");
}