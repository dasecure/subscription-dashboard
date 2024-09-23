"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSignIcon, TrendingUpIcon, CreditCardIcon, CalendarIcon, HomeIcon, ActivityIcon, SettingsIcon, MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Define the Subscription type
type Subscription = {
  id: number;
  name: string;
  amount: number;
  nextPayment: string;
  paymentMethod: string;
};

// Sample data for subscriptions
const initialSubscriptions: Subscription[] = [
  { id: 1, name: "Netflix", amount: 15.99, nextPayment: "2023-07-15", paymentMethod: "Credit Card" },
  { id: 2, name: "Spotify", amount: 9.99, nextPayment: "2023-07-20", paymentMethod: "PayPal" },
  { id: 3, name: "Amazon Prime", amount: 12.99, nextPayment: "2023-08-05", paymentMethod: "Debit Card" },
  { id: 4, name: "Gym Membership", amount: 50.00, nextPayment: "2023-07-31", paymentMethod: "Bank Transfer" },
  { id: 5, name: "Cloud Storage", amount: 5.99, nextPayment: "2023-07-18", paymentMethod: "Credit Card" },
]

export default function DashboardComponent() {
  const [activePage, setActivePage] = useState("Home")
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null)

  const totalExpense = subscriptions.reduce((sum, sub) => sum + sub.amount, 0)
  const totalInvestments = 500 // Example value
  const totalExpenditures = totalExpense + totalInvestments

  const handleRowClick = (subscription: Subscription) => {
    setEditingSubscription(subscription)
    setIsModalOpen(true)
  }

  const handleSaveSubscription = () => {
    if (editingSubscription) {
      setSubscriptions(subscriptions.map(sub => 
        sub.id === editingSubscription.id ? editingSubscription : sub
      ))
      setIsModalOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      {/* Side Navigation for larger screens */}
      <nav className="hidden md:flex flex-col w-64 bg-slate-800 border-r border-slate-700">
        <div className="p-4 text-xl font-bold text-slate-100">Subscription Manager</div>
        <NavItem icon={<HomeIcon />} label="Home" active={activePage === "Home"} onClick={() => setActivePage("Home")} />
        <NavItem icon={<ActivityIcon />} label="Activity" active={activePage === "Activity"} onClick={() => setActivePage("Activity")} />
        <NavItem icon={<SettingsIcon />} label="Settings" active={activePage === "Settings"} onClick={() => setActivePage("Settings")} />
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-slate-800 border-b border-slate-700">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-100">Subscription Manager</h1>
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-slate-800 text-slate-100 border-r border-slate-700">
                <nav className="flex flex-col space-y-4 mt-4">
                  <NavItem icon={<HomeIcon />} label="Home" active={activePage === "Home"} onClick={() => setActivePage("Home")} />
                  <NavItem icon={<ActivityIcon />} label="Activity" active={activePage === "Activity"} onClick={() => setActivePage("Activity")} />
                  <NavItem icon={<SettingsIcon />} label="Settings" active={activePage === "Settings"} onClick={() => setActivePage("Settings")} />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {activePage === "Home" && (
              <div className="px-4 py-6 sm:px-0">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <MetricCard
                    title="Total Expenditure"
                    value={`$${totalExpenditures.toFixed(2)}`}
                    icon={<DollarSignIcon className="h-6 w-6 text-blue-400" />}
                  />
                  <MetricCard
                    title="Total Investments"
                    value={`$${totalInvestments.toFixed(2)}`}
                    icon={<TrendingUpIcon className="h-6 w-6 text-green-400" />}
                  />
                  <MetricCard
                    title="Total Expense"
                    value={`$${totalExpense.toFixed(2)}`}
                    icon={<CreditCardIcon className="h-6 w-6 text-red-400" />}
                  />
                  <MetricCard
                    title="Number of Subscriptions"
                    value={subscriptions.length.toString()}
                    icon={<CalendarIcon className="h-6 w-6 text-purple-400" />}
                  />
                </div>
                <div className="mt-8">
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-slate-100">Subscriptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow className="border-slate-700">
                            <TableHead className="text-slate-300">Name</TableHead>
                            <TableHead className="text-slate-300">Amount</TableHead>
                            <TableHead className="text-slate-300">Next Payment</TableHead>
                            <TableHead className="text-slate-300">Payment Method</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {subscriptions.map((sub) => (
                            <TableRow 
                              key={sub.id} 
                              className="border-slate-700 hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
                              onClick={() => handleRowClick(sub)}
                            >
                              <TableCell className="text-slate-300">{sub.name}</TableCell>
                              <TableCell className="text-slate-300">${sub.amount.toFixed(2)}</TableCell>
                              <TableCell className="text-slate-300">{sub.nextPayment}</TableCell>
                              <TableCell className="text-slate-300">{sub.paymentMethod}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            {activePage === "Activity" && (
              <div className="px-4 py-6 sm:px-0">
                <h2 className="text-2xl font-bold mb-4 text-slate-100">Activity Page</h2>
                <p className="text-slate-300">This is where you would display user activity or transaction history.</p>
              </div>
            )}
            {activePage === "Settings" && (
              <div className="px-4 py-6 sm:px-0">
                <h2 className="text-2xl font-bold mb-4 text-slate-100">Settings Page</h2>
                <p className="text-slate-300">This is where you would display user settings and preferences.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Edit Subscription Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-slate-800 text-slate-100 border-slate-700">
          <DialogHeader>
            <DialogTitle>Edit Subscription</DialogTitle>
          </DialogHeader>
          {editingSubscription && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={editingSubscription.name}
                  onChange={(e) => setEditingSubscription({...editingSubscription, name: e.target.value})}
                  className="col-span-3 bg-slate-700 text-slate-100 border-slate-600"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={editingSubscription.amount}
                  onChange={(e) => setEditingSubscription({...editingSubscription, amount: parseFloat(e.target.value)})}
                  className="col-span-3 bg-slate-700 text-slate-100 border-slate-600"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nextPayment" className="text-right">
                  Next Payment
                </Label>
                <Input
                  id="nextPayment"
                  type="date"
                  value={editingSubscription.nextPayment}
                  onChange={(e) => setEditingSubscription({...editingSubscription, nextPayment: e.target.value})}
                  className="col-span-3 bg-slate-700 text-slate-100 border-slate-600"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paymentMethod" className="text-right">
                  Payment Method
                </Label>
                <Input
                  id="paymentMethod"
                  value={editingSubscription.paymentMethod}
                  onChange={(e) => setEditingSubscription({...editingSubscription, paymentMethod: e.target.value})}
                  className="col-span-3 bg-slate-700 text-slate-100 border-slate-600"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSubscription}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-100">{value}</div>
      </CardContent>
    </Card>
  )
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      className={`flex items-center space-x-2 px-4 py-2 w-full text-left ${
        active ? "bg-slate-700 text-slate-100" : "text-slate-300 hover:bg-slate-700 hover:text-slate-100"
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}