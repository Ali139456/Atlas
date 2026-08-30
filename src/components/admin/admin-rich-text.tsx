"use client";

import { useEffect, useRef } from "react";

export function AdminRichText({
  name,
  defaultValue = "",
  label,
}: {
  name: string;
  defaultValue?: string;
  label: string;
}) {
  const hiddenRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && defaultValue) {
      editorRef.current.innerHTML = defaultValue;
    }
  }, [defaultValue]);

  function syncHidden() {
    if (hiddenRef.current && editorRef.current) {
      hiddenRef.current.value = editorRef.current.innerHTML;
    }
  }

  function exec(command: string) {
    document.execCommand(command, false);
    syncHidden();
    editorRef.current?.focus();
  }

  function createLink() {
    const url = window.prompt("Link URL");
    if (!url) return;
    document.execCommand("createLink", false, url);
    syncHidden();
  }

  return (
    <div className="admin-field">
      <span>{label}</span>
      <div className="admin-rich-toolbar">
        <button type="button" onClick={() => exec("bold")}>
          B
        </button>
        <button type="button" onClick={() => exec("italic")}>
          I
        </button>
        <button type="button" onClick={() => exec("underline")}>
          U
        </button>
        <button type="button" onClick={() => exec("insertUnorderedList")}>
          • List
        </button>
        <button type="button" onClick={() => exec("insertOrderedList")}>
          1. List
        </button>
        <button type="button" onClick={createLink}>
          Link
        </button>
      </div>
      <div
        ref={editorRef}
        className="admin-rich-editor"
        contentEditable
        suppressContentEditableWarning
        onInput={syncHidden}
        onBlur={syncHidden}
      />
      <input ref={hiddenRef} type="hidden" name={name} defaultValue={defaultValue} />
    </div>
  );
}
