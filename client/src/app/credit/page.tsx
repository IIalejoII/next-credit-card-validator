import CreditCardValidator from "@/app/components/CreditCardValidator";
import Link from "next/link";

const DashboardPage = function DashboardPage() {
  return (
    <>
      <Link href={"/"}>
        <button
          type="button"
          className="mb-5 px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Go Back
        </button>
      </Link>
      <CreditCardValidator></CreditCardValidator>
    </>
  )

}

export default DashboardPage;