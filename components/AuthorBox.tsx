import Link from "next/link";
import Image from "next/image";
import type { Author } from "@/content/authors";

export default function AuthorBox({ author }: { author: Author }) {
  return (
    <aside className="flex items-center gap-4 sm:gap-5 rounded-lg border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
      {author.image && (
        <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-full bg-neutral-200">
          <Image
            src={author.image}
            alt={author.name}
            fill
            sizes="(min-width: 640px) 80px, 64px"
            placeholder="blur"
            className="object-cover object-[50%_20%]"
          />
        </div>
      )}
      <div className="min-w-0">
        <div className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-1">
          Written by
        </div>
        <div className="font-semibold text-neutral-900">{author.name}</div>
        {author.bio && (
          <p className="mt-1 text-sm text-neutral-600 max-w-[56ch]">{author.bio}</p>
        )}
        <Link
          href="/about"
          className="inline-block mt-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
        >
          More about me →
        </Link>
      </div>
    </aside>
  );
}
