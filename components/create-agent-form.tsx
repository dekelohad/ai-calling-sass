"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, GitBranch, MessageSquare, Layers, LinkIcon, Info } from "lucide-react"
import Link from "next/link"

type AgentType = "conversation-flow" | "single-prompt" | "multi-prompt" | "custom-llm"

interface AgentTypeInfo {
  title: string
  description: string
  icon: React.ReactNode
}

export function CreateAgentForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [agentType, setAgentType] = useState<AgentType>("conversation-flow")
  const [agentName, setAgentName] = useState("")
  const [prompt, setPrompt] = useState("")
  const [voice, setVoice] = useState("")
  const [llmLink, setLlmLink] = useState("")
  const [activeTab, setActiveTab] = useState("basic")

  useEffect(() => {
    const type = searchParams.get("type") as AgentType
    if (type) {
      setAgentType(type)
    }
  }, [searchParams])

  const agentTypeInfo: Record<AgentType, AgentTypeInfo> = {
    "conversation-flow": {
      title: "Conversation Flow Agent",
      description: "Create an agent with complex conversation flows and transitions.",
      icon: <GitBranch className="h-6 w-6" />,
    },
    "single-prompt": {
      title: "Single Prompt Agent",
      description: "Create a simple agent for short calls and straightforward tasks.",
      icon: <MessageSquare className="h-6 w-6" />,
    },
    "multi-prompt": {
      title: "Multi-Prompt Agent",
      description: "Create an agent for lengthy calls with multiple conversation stages.",
      icon: <Layers className="h-6 w-6" />,
    },
    "custom-llm": {
      title: "Custom LLM",
      description: "Connect your own custom language model via API.",
      icon: <LinkIcon className="h-6 w-6" />,
    },
  }

  // Mock voices data
  const voices = [
    { id: "cimo", name: "Cimo", language: "en-US", gender: "Male" },
    { id: "emma", name: "Emma", language: "en-US", gender: "Female" },
    { id: "dave", name: "Dave", language: "en-UK", gender: "Male" },
    { id: "sophia", name: "Sophia", language: "en-UK", gender: "Female" },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/agents" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Agents
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="bg-slate-100 p-2 rounded-md">{agentTypeInfo[agentType].icon}</div>
        <div>
          <h1 className="text-2xl font-semibold">{agentTypeInfo[agentType].title}</h1>
          <p className="text-muted-foreground">{agentTypeInfo[agentType].description}</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="prompt">Prompt</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details for your agent.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agent-name">Agent Name</Label>
                <Input
                  id="agent-name"
                  placeholder="Enter agent name"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="voice">Voice</Label>
                <Select value={voice} onValueChange={setVoice}>
                  <SelectTrigger id="voice">
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.name} ({v.language}, {v.gender})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {agentType === "custom-llm" && (
                <div className="space-y-2">
                  <Label htmlFor="llm-link">LLM API Link</Label>
                  <Input
                    id="llm-link"
                    placeholder="https://api.example.com/llm"
                    value={llmLink}
                    onChange={(e) => setLlmLink(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter the API endpoint for your custom language model.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prompt" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Prompt</CardTitle>
              <CardDescription>Define how your agent should behave and respond.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder="Enter your agent's prompt..."
                  className="min-h-[200px]"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-md flex gap-2">
                <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">Prompt Tips:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Be specific about your agent's role and personality</li>
                    <li>Include how the agent should handle different scenarios</li>
                    <li>Specify any information the agent should collect</li>
                    <li>Define how the agent should end the conversation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced options for your agent.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {agentType === "conversation-flow" && (
                <div className="space-y-2">
                  <Label>Conversation Flow</Label>
                  <div className="bg-slate-100 p-6 rounded-md flex flex-col items-center justify-center">
                    <GitBranch className="h-8 w-8 text-slate-400 mb-2" />
                    <p className="text-sm text-center text-slate-500">
                      Conversation flow editor will be available soon.
                    </p>
                  </div>
                </div>
              )}

              {agentType === "multi-prompt" && (
                <div className="space-y-2">
                  <Label>Prompt Stages</Label>
                  <div className="bg-slate-100 p-6 rounded-md flex flex-col items-center justify-center">
                    <Layers className="h-8 w-8 text-slate-400 mb-2" />
                    <p className="text-sm text-center text-slate-500">
                      Multi-prompt stage editor will be available soon.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="knowledge-base">Knowledge Base</Label>
                <Select>
                  <SelectTrigger id="knowledge-base">
                    <SelectValue placeholder="Select a knowledge base" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product-info">Product Information</SelectItem>
                    <SelectItem value="faq">FAQ Database</SelectItem>
                    <SelectItem value="technical-docs">Technical Documentation</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Connect a knowledge base to provide your agent with information.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => router.push("/agents")}>
          Cancel
        </Button>
        <Button className="bg-black text-white hover:bg-black/90">Create Agent</Button>
      </div>
    </div>
  )
}
