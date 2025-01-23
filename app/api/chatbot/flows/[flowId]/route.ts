import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-cache'

// Mock data - replace with database calls later
const mockFlows = {
  'welcome': {
    id: 'welcome',
    name: 'Welcome Flow',
    description: 'Main welcome flow for new users',
    trigger: 'message',
    updatedAt: '2024-03-15',
    nodes: [
      { 
        id: 'flow-1',
        type: 'flow',
        position: { x: 0, y: 0 },
        data: {
          label: 'Welcome Flow',
          content: 'Main welcome flow for new users',
          trigger: 'message',
        }
      },
      { 
        id: '1', 
        type: 'message', 
        position: { x: 0, y: 100 }, 
        data: { 
          label: 'Welcome Message', 
          content: 'Welcome! How can I help you today?',
          buttons: [
            { id: 'btn1', text: 'Pricing Info', action: 'show_pricing' },
            { id: 'btn2', text: 'Get Support', action: 'get_support' }
          ]
        } 
      }
    ],
    edges: [
      { id: 'e1-2', source: 'flow-1', target: '1' }
    ]
  },
  'pricing': {
    id: 'pricing',
    name: 'Pricing Flow',
    description: 'Handle pricing related queries',
    trigger: 'button',
    updatedAt: '2024-03-14',
    nodes: [
      { 
        id: 'flow-1',
        type: 'flow',
        position: { x: 0, y: 0 },
        data: {
          label: 'Pricing Flow',
          content: 'Flow for pricing information',
          trigger: 'button',
        }
      },
      { 
        id: '1', 
        type: 'message', 
        position: { x: 0, y: 100 }, 
        data: { 
          label: 'Pricing Info',
          content: 'Our pricing starts at $99/month. Would you like to see the detailed pricing breakdown?',
          buttons: [
            { id: 'btn1', text: 'See Details', action: 'show_pricing_details' },
            { id: 'btn2', text: 'Talk to Sales', action: 'talk_to_sales' }
          ]
        } 
      }
    ],
    edges: [
      { id: 'e1-2', source: 'flow-1', target: '1' }
    ]
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ flowId: string }> }
) {
  const { flowId } = await params
  const flow = mockFlows[flowId as keyof typeof mockFlows]
  
  if (!flow) {
    return new NextResponse('Flow not found', { status: 404 })
  }

  return NextResponse.json(flow)
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ flowId: string }> }
) {
  const { flowId } = await params
  const data = await request.json()
  
  // Mock save operation
  return NextResponse.json({ id: flowId, ...data })
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ flowId: string }> }
) {
  const { flowId } = await params
  const data = await request.json()
  
  // Mock update operation
  return NextResponse.json({ id: flowId, ...data })
} 