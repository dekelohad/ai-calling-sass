"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { FileUp, LinkIcon, FileText, Plus, X } from "lucide-react"

interface AddKnowledgeBaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddKnowledgeBaseDialog({ open, onOpenChange }: AddKnowledgeBaseDialogProps) {
  const [name, setName] = useState("")
  const [activeTab, setActiveTab] = useState<"web" | "files" | "text">("web")
  const [webUrl, setWebUrl] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [text, setText] = useState("")
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    // Here you would handle the actual submission
    console.log("Submitting knowledge base:", { name, activeTab, webUrl, files, text })
    onOpenChange(false)
    setName("")
    setWebUrl("")
    setFiles([])
    setText("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Knowledge Base</DialogTitle>
          <DialogDescription>Create a new knowledge base to store business data for your AI agents.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Knowledge Base Name</Label>
            <Input
              id="name"
              placeholder="Enter knowledge base name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Documents</Label>

            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                className="justify-start text-left h-auto py-3 px-4"
                onClick={() => setActiveTab("web")}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-slate-100 rounded-full p-2">
                    <LinkIcon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Add Web Pages</span>
                    <span className="text-sm text-muted-foreground">Crawl and sync your website</span>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start text-left h-auto py-3 px-4"
                onClick={() => setActiveTab("files")}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-slate-100 rounded-full p-2">
                    <FileUp className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Upload Files</span>
                    <span className="text-sm text-muted-foreground">File size should be less than 100MB</span>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start text-left h-auto py-3 px-4"
                onClick={() => setActiveTab("text")}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-slate-100 rounded-full p-2">
                    <FileText className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Add Text</span>
                    <span className="text-sm text-muted-foreground">Add articles manually</span>
                  </div>
                </div>
              </Button>
            </div>

            {activeTab === "web" && (
              <div className="mt-4 space-y-2">
                <Label htmlFor="web-url">Website URL</Label>
                <Input
                  id="web-url"
                  placeholder="https://example.com"
                  value={webUrl}
                  onChange={(e) => setWebUrl(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  We'll crawl your website and extract content to add to your knowledge base.
                </p>
              </div>
            )}

            {activeTab === "files" && (
              <div className="mt-4 space-y-2">
                <div
                  className={`border-2 border-dashed rounded-md p-6 ${
                    dragActive ? "border-primary bg-primary/5" : "border-input"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <FileUp className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm font-medium">Drag and drop files here or click to browse</p>
                    <p className="text-xs text-muted-foreground">
                      Supports PDF, DOCX, TXT, CSV, and other text-based files
                    </p>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Input id="file-upload" type="file" multiple className="hidden" onChange={handleFileChange} />
                      <Button variant="outline" size="sm" type="button">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Files
                      </Button>
                    </label>
                  </div>
                </div>

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <Label>Selected Files ({files.length})</Label>
                    <div className="max-h-[200px] overflow-y-auto space-y-2 border rounded-md p-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-slate-50 p-2 rounded-md">
                          <span className="text-sm truncate max-w-[300px]">{file.name}</span>
                          <Button variant="ghost" size="icon" onClick={() => removeFile(index)} className="h-6 w-6">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "text" && (
              <div className="mt-4 space-y-2">
                <Label htmlFor="text-content">Text Content</Label>
                <textarea
                  id="text-content"
                  className="w-full min-h-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Enter or paste text content here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">Add text content directly to your knowledge base.</p>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
