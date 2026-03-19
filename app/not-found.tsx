import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="max-w-3xl text-center">
        <p className="eyebrow">Not Found</p>
        <h1 className="section-title">The requested page does not exist</h1>
        <p className="section-lede mx-auto">
          Return to the homepage to continue exploring reimbursement strategy and policy analysis.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Return Home
        </Link>
      </Container>
    </section>
  );
}
