"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Type,
  Eraser,
  ChevronDown,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter full article content...",
  minHeight = 500,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHeadingDropdownOpen, setIsHeadingDropdownOpen] = useState(false);
  const [isTextFormattingDropdownOpen, setIsTextFormattingDropdownOpen] =
    useState(false);
  const [isListDropdownOpen, setIsListDropdownOpen] = useState(false);
  const [isLinkDropdownOpen, setIsLinkDropdownOpen] = useState(false);
  const [editorHeight, setEditorHeight] = useState(150);

  // Sync contenteditable div with the textarea-like value prop
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, []);

  // Handle input and update parent state
  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);
      // Use requestAnimationFrame to ensure DOM has updated before checking height
      requestAnimationFrame(() => {
        if (editorRef.current) {
          const scrollHeight = editorRef.current.scrollHeight;
          if (scrollHeight > editorHeight) {
            setEditorHeight(scrollHeight + 10);
          }
        }
      });
    }
  };

  // Apply formatting command
  const applyCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  // Insert content at cursor
  const insertElement = (element: HTMLElement | string) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const nodeToInsert = typeof element === "string" ? document.createTextNode(element) : element;
      range.insertNode(nodeToInsert);
      range.setStartAfter(nodeToInsert);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    editorRef.current?.focus();
    handleInput();
  };

  // Heading options
  const handleHeading = (level: "p" | "h2" | "h3") => {
    if (level === "p") {
      applyCommand("formatBlock", "p");
    } else {
      applyCommand("formatBlock", level);
    }
    setIsHeadingDropdownOpen(false);
  };

  // Text formatting options
  const handleBold = () => {
    applyCommand("bold");
    setIsTextFormattingDropdownOpen(false);
  };

  const handleItalic = () => {
    applyCommand("italic");
    setIsTextFormattingDropdownOpen(false);
  };

  const handleUnderline = () => {
    applyCommand("underline");
    setIsTextFormattingDropdownOpen(false);
  };

  const handleStrikethrough = () => {
    applyCommand("strikethrough");
    setIsTextFormattingDropdownOpen(false);
  };

  // Blockquote
  const handleBlockquote = () => {
    applyCommand("formatBlock", "blockquote");
  };

  // List options
  const handleBulletList = () => {
    applyCommand("insertUnorderedList");
    setIsListDropdownOpen(false);
  };

  const handleNumberedList = () => {
    applyCommand("insertOrderedList");
    setIsListDropdownOpen(false);
  };

  // Link options
  const handleInsertLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      applyCommand("createLink", url);
    }
    setIsLinkDropdownOpen(false);
  };

  const handlePasteURL = () => {
    const url = window.prompt("Enter URL to insert:");
    if (url) {
      const link = document.createElement("a");
      link.href = url;
      link.textContent = url;
      link.className = "text-blue-600 underline hover:text-blue-800 cursor-pointer";
      insertElement(link);
    }
    setIsLinkDropdownOpen(false);
  };

  // Upload image
  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/cloudinary/upload', { method: 'POST', body: fd });
      if (!res.ok) {
        console.error('Cloudinary upload failed:', await res.text());
        return;
      }
      const json = await res.json();
      const img = document.createElement("img");
      img.src = json.secure_url;
      img.className = "max-w-md mx-auto block h-auto rounded-xl my-6 shadow-md border border-slate-200 dark:border-slate-800";
      img.style.maxWidth = "450px";
      img.style.width = "100%";
      img.style.height = "auto";
      img.style.display = "block";
      img.style.margin = "1.5rem auto";
      insertElement(img);
    } catch (err) {
      console.error('RichTextEditor upload error:', err);
    }
  };

  // Clear formatting
  const handleClearFormatting = () => {
    applyCommand("removeFormat");
    applyCommand("formatBlock", "p");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".dropdown-menu")) {
        setIsHeadingDropdownOpen(false);
        setIsTextFormattingDropdownOpen(false);
        setIsListDropdownOpen(false);
        setIsLinkDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
      {/* Toolbar */}
      <div className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-3 flex flex-wrap items-center gap-2">
        {/* Headings Dropdown */}
        <div className="relative dropdown-menu">
          <button
            type="button"
            onClick={() => setIsHeadingDropdownOpen(!isHeadingDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
            title="Headings"
          >
            <Type className="w-4 h-4" />
            <ChevronDown className="w-3 h-3" />
          </button>
          {isHeadingDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg z-10 min-w-max">
              <button
                type="button"
                onClick={() => handleHeading("p")}
                className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
              >
                Normal (Paragraph)
              </button>
              <button
                type="button"
                onClick={() => handleHeading("h2")}
                className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors font-semibold"
              >
                Heading 2 (H2)
              </button>
              <button
                type="button"
                onClick={() => handleHeading("h3")}
                className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors font-semibold"
              >
                Heading 3 (H3)
              </button>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-600" />

        {/* Text Formatting Dropdown */}
        <div className="relative dropdown-menu">
          <button
            type="button"
            onClick={() =>
              setIsTextFormattingDropdownOpen(!isTextFormattingDropdownOpen)
            }
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
            title="Text Formatting"
          >
            <Bold className="w-4 h-4" />
            <ChevronDown className="w-3 h-3" />
          </button>
          {isTextFormattingDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg z-10 min-w-max">
              <button
                type="button"
                onClick={handleBold}
                className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors font-bold"
              >
                Bold
              </button>
              <button
                type="button"
                onClick={handleItalic}
                className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors italic"
              >
                Italic
              </button>
              <button
                type="button"
                onClick={handleUnderline}
                className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors underline"
              >
                Underline
              </button>
              <button
                type="button"
                onClick={handleStrikethrough}
                className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors line-through"
              >
                Strikethrough
              </button>
            </div>
          )}
        </div>

        {/* Blockquote Button */}
        <button
          type="button"
          onClick={handleBlockquote}
          className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-600" />

        {/* Lists Dropdown */}
        <div className="relative dropdown-menu">
          <button
            type="button"
            onClick={() => setIsListDropdownOpen(!isListDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
            title="Lists"
          >
            <List className="w-4 h-4" />
            <ChevronDown className="w-3 h-3" />
          </button>
          {isListDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg z-10 min-w-max">
              <button
                type="button"
                onClick={handleBulletList}
                className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
              >
                <List className="w-4 h-4" />
                Bulleted List
              </button>
              <button
                type="button"
                onClick={handleNumberedList}
                className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
              >
                <ListOrdered className="w-4 h-4" />
                Numbered List
              </button>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-600" />

        {/* Links Dropdown */}
        <div className="relative dropdown-menu">
          <button
            type="button"
            onClick={() => setIsLinkDropdownOpen(!isLinkDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
            title="Links"
          >
            <LinkIcon className="w-4 h-4" />
            <ChevronDown className="w-3 h-3" />
          </button>
          {isLinkDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg z-10 min-w-max">
              <button
                type="button"
                onClick={handleInsertLink}
                className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
              >
                <LinkIcon className="w-4 h-4" />
                Insert Link
              </button>
              <button
                type="button"
                onClick={handlePasteURL}
                className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
              >
                Paste URL
              </button>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-600" />

        {/* Upload Image Button */}
        <button
          type="button"
          onClick={handleImageUpload}
          className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
          title="Upload Image"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        {/* Clear Formatting Button */}
        <button
          type="button"
          onClick={handleClearFormatting}
          className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
          title="Clear Formatting"
        >
          <Eraser className="w-4 h-4" />
        </button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Editor Content Area */}
      <div className="relative">
        <style>{`
          .editor-content {
            margin: 0 !important;
            padding: 0 !important;
            line-height: 1.6 !important;
            font-size: 16px !important;
          }
          .editor-content h2 {
            font-size: 1.5rem !important;
            font-weight: 700 !important;
            margin: 0.25rem 0 !important;
            padding: 0 !important;
            line-height: 1.3 !important;
          }
          .editor-content h3 {
            font-size: 1.25rem !important;
            font-weight: 600 !important;
            margin: 0.2rem 0 !important;
            padding: 0 !important;
            line-height: 1.4 !important;
          }
          .editor-content p {
            font-size: 1rem !important;
            font-weight: 400 !important;
            margin: 0.2rem 0 !important;
            padding: 0 !important;
            line-height: 1.6 !important;
          }
          .editor-content ul,
          .editor-content ol {
            margin: 0.2rem 0 !important;
            margin-left: 1.5rem !important;
            padding: 0 !important;
          }
          .editor-content li {
            margin: 0.1rem 0 !important;
            padding: 0 !important;
            line-height: 1.6 !important;
          }
          .editor-content blockquote {
            border-left: 4px solid #6366f1 !important;
            padding-left: 1rem !important;
            margin: 0.3rem 0 !important;
            color: #64748b !important;
            font-style: italic !important;
            line-height: 1.6 !important;
          }
          .editor-content a {
            color: #2563eb !important;
            text-decoration: underline !important;
          }
          .editor-content img {
            max-width: 100% !important;
            height: auto !important;
            margin: 0.5rem auto !important;
            border-radius: 0.5rem !important;
          }
          .editor-content div {
            margin: 0.2rem 0 !important;
            padding: 0 !important;
          }
        `}</style>
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onClick={() => editorRef.current?.focus()}
          style={{ minHeight: `${editorHeight}px` }}
          className="w-full px-4 py-4 text-slate-900 dark:text-white focus:outline-none overflow-hidden resize-none leading-relaxed editor-content"
          role="textbox"
          aria-label="Rich text editor content"
        />
        {!value && (
          <div className="absolute top-4 left-4 text-slate-400 dark:text-slate-500 pointer-events-none select-none">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
}
