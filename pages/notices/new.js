import Head from "next/head";
import Link from "next/link";
import NoticeForm from "../../components/NoticeForm";

export default function NewNotice() {
  return (
    <>
      <Head>
        <title>Add Notice · Notice Board</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors text-sm">
              ← Back
            </Link>
            <h1 className="text-lg font-bold text-gray-900">Add New Notice</h1>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <NoticeForm />
          </div>
        </main>
      </div>
    </>
  );
}
