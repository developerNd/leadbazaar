'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Icons } from '@/components/icons'
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Globe, Webhook, CheckCircle2, XCircle, RefreshCcw, ArrowDownToLine, Send } from 'lucide-react'

interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[];
  isActive: boolean;
  mapping: {
    sourceField: string;
    targetField: string;
  }[];
}

const integrations = [
  // CRM Integrations
  { id: 'salesforce', name: 'Salesforce', icon: 'salesforce', category: 'crm', color: '#00A1E0' },
  { id: 'hubspot', name: 'HubSpot', icon: 'hubspot', category: 'crm', color: '#FF7A59' },
  
  // Marketing Integrations
  { id: 'mailchimp', name: 'Mailchimp', icon: 'mailchimp', category: 'marketing', color: '#FFE01B' },
  { id: 'facebook_leads', name: 'Facebook Lead Forms', icon: 'facebook', category: 'marketing', color: '#1877F2' },
  
  // Messaging Integrations
  { id: 'whatsapp', name: 'WhatsApp Cloud API', icon: 'messageSquare', category: 'messaging', color: '#25D366' },
  { id: 'messenger', name: 'Facebook Messenger', icon: 'facebook', category: 'messaging', color: '#1877F2' },
  { id: 'sms', name: 'SMS Gateway', icon: 'messageSquare', category: 'messaging', color: '#6b7280' },
  
  // Payment Integrations
  { id: 'razorpay', name: 'Razorpay', icon: 'creditCard', category: 'payments', color: '#2D72FE' },
  { id: 'instamojo', name: 'Instamojo', icon: 'creditCard', category: 'payments', color: '#0A2540' },
  { id: 'stripe', name: 'Stripe', icon: 'creditCard', category: 'payments', color: '#635BFF' },
  
  // Automation & Others
  { id: 'zapier', name: 'Zapier', icon: 'zapier', category: 'automation', color: '#FF4A00' },
  { id: 'calendly', name: 'Calendly', icon: 'calendly', category: 'scheduling', color: '#006BFF' },
  { id: 'appointmentBooking', name: 'Our Appointment Booking', icon: 'calendar', category: 'scheduling', color: '#0070f3' },
]

const dummyLogs = [
  { 
    id: 1, 
    integration: 'Salesforce', 
    action: 'Data sync', 
    status: 'Success', 
    timestamp: '2023-06-15 10:30:00',
    icon: RefreshCcw
  },
  { 
    id: 2, 
    integration: 'HubSpot', 
    action: 'Contact import', 
    status: 'Failed', 
    timestamp: '2023-06-15 11:45:00',
    icon: ArrowDownToLine
  },
  { 
    id: 3, 
    integration: 'Mailchimp', 
    action: 'Campaign sync', 
    status: 'Success', 
    timestamp: '2023-06-15 13:15:00',
    icon: RefreshCcw
  },
  { 
    id: 4, 
    integration: 'Zapier', 
    action: 'Trigger update', 
    status: 'Success', 
    timestamp: '2023-06-15 14:30:00',
    icon: Send
  },
  { 
    id: 5, 
    integration: 'Calendly', 
    action: 'Appointment sync', 
    status: 'Success', 
    timestamp: '2023-06-15 15:45:00',
    icon: RefreshCcw
  },
]

export default function IntegrationsPage() {
  const [activeIntegrations, setActiveIntegrations] = useState<string[]>([])
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null)
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([
    {
      id: '1',
      name: 'Lead Form Webhook',
      url: 'https://example.com/webhook1',
      events: ['lead.created', 'lead.updated'],
      isActive: true,
      mapping: [
        { sourceField: 'name', targetField: 'fullName' },
        { sourceField: 'email', targetField: 'emailAddress' }
      ]
    }
  ])
  const [showNewWebhookDialog, setShowNewWebhookDialog] = useState(false)
  const [newWebhook, setNewWebhook] = useState<Partial<WebhookConfig>>({
    name: '',
    url: '',
    events: [],
    mapping: []
  })

  const toggleIntegration = (integrationId: string) => {
    setActiveIntegrations(prev => 
      prev.includes(integrationId) 
        ? prev.filter(id => id !== integrationId)
        : [...prev, integrationId]
    )
  }

  const addWebhook = () => {
    if (newWebhook.name && newWebhook.url) {
      setWebhooks(prev => [...prev, {
        id: Date.now().toString(),
        name: newWebhook.name!,
        url: newWebhook.url!,
        events: newWebhook.events || [],
        isActive: true,
        mapping: newWebhook.mapping || []
      }])
      setNewWebhook({ name: '', url: '', events: [], mapping: [] })
      setShowNewWebhookDialog(false)
    }
  }

  const deleteWebhook = (id: string) => {
    setWebhooks(prev => prev.filter(webhook => webhook.id !== id))
  }

  const toggleWebhook = (id: string) => {
    setWebhooks(prev => prev.map(webhook => 
      webhook.id === id ? { ...webhook, isActive: !webhook.isActive } : webhook
    ))
  }

  const addFieldMapping = (webhookId: string) => {
    setWebhooks(prev => prev.map(webhook => {
      if (webhook.id === webhookId) {
        return {
          ...webhook,
          mapping: [...webhook.mapping, { sourceField: '', targetField: '' }]
        }
      }
      return webhook
    }))
  }

  const updateFieldMapping = (webhookId: string, index: number, field: 'sourceField' | 'targetField', value: string) => {
    setWebhooks(prev => prev.map(webhook => {
      if (webhook.id === webhookId) {
        const newMapping = [...webhook.mapping]
        newMapping[index] = { ...newMapping[index], [field]: value }
        return { ...webhook, mapping: newMapping }
      }
      return webhook
    }))
  }

  const removeFieldMapping = (webhookId: string, index: number) => {
    setWebhooks(prev => prev.map(webhook => {
      if (webhook.id === webhookId) {
        const newMapping = webhook.mapping.filter((_, i) => i !== index)
        return { ...webhook, mapping: newMapping }
      }
      return webhook
    }))
  }

  return (
    <div className="container mx-auto py-10 p-2 overflow-y-scroll h-full">
      <h1 className="text-4xl font-bold mb-6">Integrations Hub</h1>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="crm">CRM</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="messaging">Messaging</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
        </TabsList>
        {['all', 'crm', 'marketing', 'messaging', 'payments', 'automation', 'scheduling'].map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {integrations
                .filter(integration => category === 'all' || integration.category === category)
                .map(integration => (
                  <Card key={integration.id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center">
                          {Icons[integration.icon as keyof typeof Icons] && (
                            <div className="mr-2">
                              {React.createElement(Icons[integration.icon as keyof typeof Icons], {
                                className: "h-6 w-6",
                                style: { color: integration.color }
                              })}
                            </div>
                          )}
                          {integration.name}
                        </span>
                        <Switch
                          checked={activeIntegrations.includes(integration.id)}
                          onCheckedChange={() => toggleIntegration(integration.id)}
                        />
                      </CardTitle>
                      <CardDescription>
                        Connect and sync data with {integration.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {activeIntegrations.includes(integration.id) && (
                        <p className="text-sm text-green-600">Integration active</p>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full" onClick={() => setSelectedIntegration(integration.id)}>
                            Configure
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Configure {integration.name}</DialogTitle>
                            <DialogDescription>
                              Set up your integration with {integration.name}. Make sure you have your API credentials ready.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="apiKey" className="text-right">
                                API Key
                              </Label>
                              <Input id="apiKey" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="apiSecret" className="text-right">
                                API Secret
                              </Label>
                              <Input id="apiSecret" type="password" className="col-span-3" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Webhooks</h2>
          <Button onClick={() => setShowNewWebhookDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Webhook
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {webhooks.map(webhook => (
            <Card key={webhook.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Webhook className="h-5 w-5 text-blue-500" />
                    <CardTitle>{webhook.name}</CardTitle>
                  </div>
                  <Switch
                    checked={webhook.isActive}
                    onCheckedChange={() => toggleWebhook(webhook.id)}
                  />
                </div>
                <CardDescription className="mt-2">
                  <div className="flex items-center text-sm">
                    <Globe className="h-4 w-4 mr-1 text-gray-500" />
                    {webhook.url}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {webhook.events.map(event => (
                      <Badge key={event} variant="secondary">
                        {event}
                      </Badge>
                    ))}
                  </div>
                  {webhook.mapping.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm font-medium text-gray-500 mb-2">Field Mapping</p>
                      <div className="space-y-1">
                        {webhook.mapping.map((map, index) => (
                          <div key={index} className="text-sm flex justify-between">
                            <span>{map.sourceField}</span>
                            <span className="text-gray-500">→</span>
                            <span>{map.targetField}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => deleteWebhook(webhook.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Configure</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>Configure Webhook</DialogTitle>
                      <DialogDescription>
                        Set up webhook endpoints and configure data mapping.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label>Webhook Name</Label>
                        <Input value={webhook.name} />
                      </div>
                      <div className="grid gap-2">
                        <Label>Endpoint URL</Label>
                        <Input value={webhook.url} />
                      </div>
                      <div className="grid gap-2">
                        <Label>Events</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select events to trigger webhook" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lead.created">Lead Created</SelectItem>
                            <SelectItem value="lead.updated">Lead Updated</SelectItem>
                            <SelectItem value="lead.deleted">Lead Deleted</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Field Mapping</Label>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                          <div className="space-y-2">
                            {webhook.mapping.map((map, index) => (
                              <div key={index} className="flex gap-2">
                                <Select
                                  value={map.sourceField}
                                  onValueChange={(value) => updateFieldMapping(webhook.id, index, 'sourceField', value)}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Source field" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="name">Name</SelectItem>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="phone">Phone</SelectItem>
                                  </SelectContent>
                                </Select>
                                <span className="flex items-center">→</span>
                                <Select
                                  value={map.targetField}
                                  onValueChange={(value) => updateFieldMapping(webhook.id, index, 'targetField', value)}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Target field" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="fullName">Full Name</SelectItem>
                                    <SelectItem value="emailAddress">Email Address</SelectItem>
                                    <SelectItem value="phoneNumber">Phone Number</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => removeFieldMapping(webhook.id, index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                          <div className="sticky bottom-0 pt-2 bg-white dark:bg-gray-950">
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => addFieldMapping(webhook.id)}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Field Mapping
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={showNewWebhookDialog} onOpenChange={setShowNewWebhookDialog}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Add New Webhook</DialogTitle>
            <DialogDescription>
              Create a new webhook endpoint and configure its settings.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Webhook Name</Label>
              <Input 
                value={newWebhook.name} 
                onChange={e => setNewWebhook(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter webhook name"
              />
            </div>
            <div className="grid gap-2">
              <Label>Endpoint URL</Label>
              <Input 
                value={newWebhook.url}
                onChange={e => setNewWebhook(prev => ({ ...prev, url: e.target.value }))}
                placeholder="https://your-endpoint.com/webhook"
              />
            </div>
            <div className="grid gap-2">
              <Label>Events</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select events to trigger webhook" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead.created">Lead Created</SelectItem>
                  <SelectItem value="lead.updated">Lead Updated</SelectItem>
                  <SelectItem value="lead.deleted">Lead Deleted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewWebhookDialog(false)}>
              Cancel
            </Button>
            <Button onClick={addWebhook}>Create Webhook</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Integration Settings</h2>
        <Card>
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Data Sync Frequency</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <Label htmlFor="sync-frequency">Sync every</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="360">6 hours</SelectItem>
                        <SelectItem value="720">12 hours</SelectItem>
                        <SelectItem value="1440">24 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Data Mapping</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">Configure how data fields from integrated services map to your CRM fields.</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Configure Mapping</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>Data Mapping Configuration</DialogTitle>
                        <DialogDescription>
                          Map fields from your integrated services to your CRM fields.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="sourceField" className="text-right">
                            Source Field
                          </Label>
                          <Select>
                            <SelectTrigger className="w-full col-span-3">
                              <SelectValue placeholder="Select source field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="name">Name</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="phone">Phone</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="targetField" className="text-right">
                            Target Field
                          </Label>
                          <Select>
                            <SelectTrigger className="w-full col-span-3">
                              <SelectValue placeholder="Select target field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fullName">Full Name</SelectItem>
                              <SelectItem value="emailAddress">Email Address</SelectItem>
                              <SelectItem value="phoneNumber">Phone Number</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save mapping</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Integration Logs</AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Integration</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Timestamp</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dummyLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {Icons[log.integration.toLowerCase() as keyof typeof Icons] ? (
                                React.createElement(Icons[log.integration.toLowerCase() as keyof typeof Icons], {
                                  className: "h-4 w-4",
                                  style: { 
                                    color: integrations.find(i => 
                                      i.name.toLowerCase() === log.integration.toLowerCase()
                                    )?.color 
                                  }
                                })
                              ) : (
                                <div className="h-4 w-4" />
                              )}
                              {log.integration}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {React.createElement(log.icon, { className: "h-4 w-4 text-gray-500" })}
                              {log.action}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {log.status === 'Success' ? (
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 flex items-center gap-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Success
                                </Badge>
                              ) : (
                                <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 flex items-center gap-1">
                                  <XCircle className="h-3 w-3" />
                                  Failed
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-500">
                            {log.timestamp}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

