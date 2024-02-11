import { Camera, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewMemory() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="w-4 h-4" />
        voltar à timeline
      </Link>
      <form className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-4">
          <label
            htmlFor="media"
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            <input id="media" type="file" className="sr-only" />
            <Camera className="w-4 h-4" />
            Anexar mídia
          </label>
          <label
            htmlFor="isPublic"
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            <input id="isPublic" name="isPublic" value="true" type="checkbox" className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500" />
            Tornar memória pública
          </label>
        </div>
        <textarea name="content" spellCheck={false} placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre..." className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0" />
      </form>
    </div>
  );
}
