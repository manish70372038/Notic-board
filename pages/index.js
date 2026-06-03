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
    props: { initialNotices: JSON.parse(JSON.stringify(notices)) },
  };
}

export default function Home({ initialNotices }) {
  const [notices, setNotices] = useState(initialNotices);
  const handleDeleted = (id) => setNotices((prev) => prev.filter((n) => n.id !== id));
  const urgentCount = notices.filter((n) => n.priority === "Urgent").length;

  return (
    <>
      <Head>
        <title>Notice Board</title>
      </Head>
      <div className="min-h-screen bg-slate-100">
        <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                📋 Notice Board
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                {notices.length} notice{notices.length !== 1 ? "s" : ""}
                {urgentCount > 0 && (
                  <span className="ml-2 text-red-500 font-semibold">· {urgentCount} urgent</span>
                )}
              </p>
            </div>
            <Link
              href="/notices/new"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              + Add Notice
            </Link>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8">
          {notices.length === 0 ? (
            <div className="text-center py-28">
              <p className="text-6xl mb-4">📭</p>
              <h2 className="text-xl font-bold text-slate-600 mb-2">No notices yet</h2>
              <p className="text-sm text-slate-400 mb-6">Add your first notice to get started.</p>
              <Link
                href="/notices/new"
                className="bg-indigo-600 text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
              >
                + Add Notice
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {notices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} onDeleted={handleDeleted} />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}