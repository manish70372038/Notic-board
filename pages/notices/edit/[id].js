import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import NoticeForm from "../../../components/NoticeForm";
import prisma from "../../../lib/prisma";

export async function getServerSideProps({ params }) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return { notFound: true };
  }

  const notice = await prisma.notice.findUnique({ where: { id } });

  if (!notice) {
    return { notFound: true };
  }

  return {
    props: {
      notice: JSON.parse(JSON.stringify(notice)),
    },
  };
}

export default function EditNotice({ notice }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Edit Notice · Notice Board</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
            <Link
              href="/"
              className="text-gray-400 hover:text-gray-600 transition-colors text-sm"
            >
              ← Back
            </Link>
            <h1 className="text-lg font-bold text-gray-900">Edit Notice</h1>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <NoticeForm initial={notice} noticeId={notice.id} />
          </div>
        </main>
      </div>
    </>
  );
}
