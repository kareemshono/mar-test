// components/blog/PostCard.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";


type Post = {
  number: string;
  title: string;
  description: string;
};

type PostCardProps = {
  post: Post;
  index: number;
};

export default function PostCard({ post, index }: PostCardProps) {
  return (
     <>
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            type: "spring",
            stiffness: 100,
            damping: 12,
          }}
          whileHover={{ y: -12, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="cursor-pointer" // Important for UX
        >
          <Card className="h-full bg-zinc-50 dark:bg-slate-950 overflow-hidden gap-3 border border-gray-200 dark:border-gray-800 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-transparent relative group">
            {/* Number Badge */}
            <div className="absolute -top-1 -left-1 z-10">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-rose-500 to-purple-600 text-white text-lg font-bold shadow-xl">
                {post.number}
              </span>
            </div>

            <CardHeader className="pt-12">
              <CardTitle className="text-xl group-hover:text-rose-500 transition-colors duration-300">
                {post.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <CardDescription className="line-clamp-4">
                {post.description}
              </CardDescription>
            </CardContent>

            {/* Hover gradient overlay + bottom bar */}
            <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Card>
        </motion.div>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="max-w-3xl max-h-[90vh] p-5 border-0 overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-flex items-center justify-center mr-auto lg:mr-0 w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-purple-600 text-white text-2xl font-bold shadow-xl">
              {post.number}
            </span>
            </div>
            <DialogTitle className="text-xl md:text-xl">{post.title}</DialogTitle>
          <DialogDescription className="text-base md:text-sm leading-relaxed text-gray-700 dark:text-gray-300 mt-6">
            {post.description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
   </>
  );
}