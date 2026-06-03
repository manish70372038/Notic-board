import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import prisma from "../lib/prisma";
import NoticeCard from "../components/NoticeCard";

export async function getServerSideProps() {
  const notices = await prisma.notice.findMany({
    orderBy: [{ priority: "desc" }, { publishDate: "desc" }],
  });

  return {
    props: {
      initialNotices: JSON.parse(JSON.stringify(notices)),
    },
  };
}

export default function Home({ initialNotices }) {
  const [notices, setNotices] = useState(initialNotices);

  const handleDeleted = (deletedId) => {
    setNotices((prev) => prev.filter((n) => n.id !== deletedId));
  };

  const urgentCount = notices.filter((n) => n.priority === "Urgent").length;

  return (
    <>
      <Head>
        <title>Notice Board</title>
        <meta name="description" content="Institutional Notice Board" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                📋 Notice Board
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                {notices.length} notice{notices.length !== 1 ? "s" : ""}
                {urgentCount > 0 && (
                  <span className="ml-2 text-red-500 font-medium">
                    · {urgentCount} urgent
                  </span>
                )}
              </p>
            </div>
            <Link
              href="/notices/new"
              className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              + Add Notice
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          {notices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="text-5xl mb-4">📭</span>
              <h2 className="text-lg font-semibold text-gray-700 mb-1">
                No notices yet
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                Create your first notice to get started.
              </p>
              <Link
                href="/notices/new"
                className="bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
              >
                + Add Notice
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {notices.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  notice={notice}
                  onDeleted={handleDeleted}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
