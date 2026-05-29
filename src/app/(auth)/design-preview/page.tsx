import React from "react";
import {
  Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Badge, Avatar, Spinner, Skeleton, CardSkeleton, Select, Textarea,
  Table, TableHead, TableBody, TableRow, TableHeader, TableCell,
  Tabs, TabsList, TabsTrigger, TabsContent,
  StatCard, EmptyState, SearchInput, PageHeader, StatusDot,
} from "@/components/ui";
import {
  Users, Stethoscope, Calendar, FlaskConical, CreditCard,
  Bell, Settings, AlertTriangle, CheckCircle2, Plus,
} from "lucide-react";

export default function DesignPreviewPage() {
  return (
    <div className="min-h-screen bg-surface-bg p-8 max-w-5xl mx-auto space-y-12">

      {/* ── Header ── */}
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-text-primary">HMS Design System</h1>
        <p className="text-text-muted mt-1">Color tokens, typography, and components — Sprint 01 foundation</p>
      </div>

      {/* ── Colors ── */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Color Palette</h2>
        <div className="grid grid-cols-1 gap-6">
          {/* Navy */}
          <div>
            <p className="text-sm font-medium text-text-secondary mb-2">Navy (Primary)</p>
            <div className="flex gap-1 flex-wrap">
              {["#DDE4F8","#B8C5F0","#849AE3","#5577D4","#3258C4","#2647A0","#1E3A7A","#162D5E","#0F2044","#0A1628"].map((c, i) => (
                <div key={c} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-lg shadow-sm border border-border" style={{ backgroundColor: c }} />
                  <span className="text-[10px] text-text-muted">{[50,100,200,300,400,500,600,700,800,900,950][i]}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Teal */}
          <div>
            <p className="text-sm font-medium text-text-secondary mb-2">Teal (Secondary)</p>
            <div className="flex gap-1 flex-wrap">
              {["#D0F5F3","#9EE8E4","#62D6CE","#35C4BA","#1FA89E","#1A8C84","#16706A","#125550","#0D3B38"].map((c, i) => (
                <div key={c} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-lg shadow-sm border border-border" style={{ backgroundColor: c }} />
                  <span className="text-[10px] text-text-muted">{[100,200,300,400,500,600,700,800,900][i]}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Amber */}
          <div>
            <p className="text-sm font-medium text-text-secondary mb-2">Amber (Accent)</p>
            <div className="flex gap-1 flex-wrap">
              {["#FEF0D8","#FDD9A8","#FBBC6E","#F9A13A","#F0820A","#C46800","#9A5000"].map((c, i) => (
                <div key={c} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-lg shadow-sm border border-border" style={{ backgroundColor: c }} />
                  <span className="text-[10px] text-text-muted">{[100,200,300,400,500,600,700][i]}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Role Colors */}
          <div>
            <p className="text-sm font-medium text-text-secondary mb-2">Role Colors</p>
            <div className="flex gap-3 flex-wrap">
              {[
                { label: "Admin",        bg: "#1E3A7A", text: "#DDE4F8" },
                { label: "Doctor",       bg: "#1A8C84", text: "#D0F5F3" },
                { label: "Receptionist", bg: "#C46800", text: "#FEF0D8" },
                { label: "Patient",      bg: "#7C3AED", text: "#F5F3FF" },
                { label: "Lab Tech",     bg: "#0891B2", text: "#ECFEFF" },
              ].map(({ label, bg, text }) => (
                <div key={label} className="px-4 py-2 rounded-lg text-sm font-medium shadow-sm" style={{ backgroundColor: bg, color: text }}>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Buttons ── */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="success">Success</Button>
          <Button variant="primary" loading>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
        <div className="flex flex-wrap gap-3 items-center mt-3">
          <Button size="sm" variant="primary">Small</Button>
          <Button size="md" variant="primary">Medium</Button>
          <Button size="lg" variant="primary">Large</Button>
          <Button size="sm" variant="primary"><Plus className="h-3.5 w-3.5" /> Add Patient</Button>
        </div>
      </section>

      {/* ── Badges ── */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Badges</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="success" dot>Active</Badge>
          <Badge variant="warning" dot>Pending</Badge>
          <Badge variant="danger">Cancelled</Badge>
          <Badge variant="info">In Progress</Badge>
          <Badge variant="muted">Draft</Badge>
          <Badge variant="role-admin">Admin</Badge>
          <Badge variant="role-doctor">Doctor</Badge>
          <Badge variant="role-receptionist">Receptionist</Badge>
          <Badge variant="role-patient">Patient</Badge>
          <Badge variant="role-lab">Lab Tech</Badge>
        </div>
      </section>

      {/* ── Avatars ── */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Avatars</h2>
        <div className="flex items-end gap-4">
          <Avatar name="Hospital Admin" role="admin"        size="xl" />
          <Avatar name="Dr. John Obi"   role="doctor"       size="lg" />
          <Avatar name="Ada Ekwu"       role="receptionist" size="md" />
          <Avatar name="Mike Patient"   role="patient"      size="sm" />
          <Avatar name="Lab Tech"       role="lab"          size="xs" />
        </div>
      </section>

      {/* ── Status Dots ── */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Status Indicators</h2>
        <div className="flex flex-wrap gap-6">
          <StatusDot status="online"   label="Online"   pulse />
          <StatusDot status="offline"  label="Offline" />
          <StatusDot status="busy"     label="Busy"     pulse />
          <StatusDot status="pending"  label="Pending" />
          <StatusDot status="active"   label="Active"  />
          <StatusDot status="inactive" label="Inactive" />
        </div>
      </section>

      {/* ── Stat Cards ── */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Stat Cards</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total Patients"   value="1,284" subtitle="Registered"       icon={<Users className="h-5 w-5" />}          color="primary" trend={{ value: 12, label: "this month" }} />
          <StatCard title="Active Doctors"   value="48"    subtitle="On duty today"    icon={<Stethoscope className="h-5 w-5" />}    color="teal"    trend={{ value: 3, label: "vs last week" }} />
          <StatCard title="Today's Visits"   value="132"   subtitle="Check-ins"         icon={<Calendar className="h-5 w-5" />}       color="accent" />
          <StatCard title="Pending Labs"     value="29"    subtitle="Awaiting results"  icon={<FlaskConical className="h-5 w-5" />}   color="danger" />
        </div>
      </section>

      {/* ── Inputs ── */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Form Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <Input label="Patient Name" placeholder="e.g. Amaka Johnson" required />
          <Input label="NHIS UID" placeholder="NHIS-0001-LG" hint="Check your NHIS card" />
          <Input label="Email" type="email" placeholder="doctor@hospital.ng"
            leftIcon={<span className="text-xs">@</span>} />
          <Input label="Error State" value="bad input" error="This field is invalid" onChange={() => {}} />
          <Select
            label="Department"
            placeholder="Select department"
            options={[
              { value: "cardio", label: "Cardiology" },
              { value: "neuro", label: "Neurology" },
              { value: "peds",  label: "Paediatrics" },
            ]}
          />
          <Textarea label="Doctor Notes" placeholder="Enter consultation notes…" />
        </div>
      </section>

      {/* ── Search Input ── */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Search</h2>
        <SearchInput value="" onChange={() => {}} placeholder="Search patients by name, phone, or NHIS UID…" className="max-w-md" />
      </section>

      {/* ── Cards ── */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Record</CardTitle>
              <CardDescription>Last updated 2 hours ago</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-secondary">Amaka Johnson · F · 34 yrs</p>
              <p className="text-sm text-text-muted mt-1">NHIS-0001-LG · Ward B</p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="secondary">View Record</Button>
              <Button size="sm" variant="ghost">Edit</Button>
            </CardFooter>
          </Card>
          <Card elevated>
            <CardHeader>
              <CardTitle>Appointment #A-4821</CardTitle>
              <CardDescription>Dr. Emeka Okafor · Cardiology</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Date</span>
                <span className="font-medium">22 May 2026, 10:30 AM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Status</span>
                <Badge variant="success" dot>Confirmed</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Table ── */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Table</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Patient</TableHeader>
              <TableHeader>NHIS UID</TableHeader>
              <TableHeader>Doctor</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { name: "Amaka Johnson",   uid: "NHIS-0001-LG", doc: "Dr. Okafor", status: "success"  as const, label: "Active" },
              { name: "Chukwu Emmanuel", uid: "NHIS-0002-AB", doc: "Dr. Bello",  status: "warning"  as const, label: "Pending" },
              { name: "Fatima Hassan",   uid: "NHIS-0003-KN", doc: "Dr. Adeyemi",status: "danger"   as const, label: "Locked" },
            ].map((row) => (
              <TableRow key={row.uid}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar name={row.name} role="patient" size="sm" />
                    <span className="font-medium">{row.name}</span>
                  </div>
                </TableCell>
                <TableCell><span className="font-mono text-xs text-text-secondary">{row.uid}</span></TableCell>
                <TableCell>{row.doc}</TableCell>
                <TableCell><Badge variant={row.status} dot>{row.label}</Badge></TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost">View</Button>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* ── Tabs ── */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Tabs</h2>
        <Tabs defaultValue="vitals">
          <TabsList>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="notes">Doctor Notes</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="lab">Lab Results</TabsTrigger>
          </TabsList>
          <TabsContent value="vitals">
            <p className="text-sm text-text-secondary">BP: 120/80 · Temp: 36.8°C · Weight: 72kg · SpO₂: 98%</p>
          </TabsContent>
          <TabsContent value="notes">
            <p className="text-sm text-text-secondary">Patient presents with mild hypertension. Prescribed Amlodipine 5mg daily.</p>
          </TabsContent>
          <TabsContent value="prescriptions">
            <p className="text-sm text-text-secondary">Amlodipine 5mg · Once daily · 30 days</p>
          </TabsContent>
          <TabsContent value="lab">
            <p className="text-sm text-text-secondary">FBC: Normal · Lipid Panel: Pending</p>
          </TabsContent>
        </Tabs>
      </section>

      {/* ── Skeleton ── */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Loading Skeletons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </section>

      {/* ── Spinner ── */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Spinners</h2>
        <div className="flex items-center gap-6">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </section>

      {/* ── Empty State ── */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Empty State</h2>
        <Card>
          <EmptyState
            icon={<Calendar className="h-7 w-7" />}
            title="No appointments yet"
            description="When patients book appointments, they'll appear here."
            action={<Button size="sm" variant="primary"><Plus className="h-4 w-4" /> Book Appointment</Button>}
          />
        </Card>
      </section>

      {/* ── Typography ── */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Typography</h2>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-text-primary">Display Bold — DM Sans 700</p>
          <p className="text-2xl font-semibold text-text-primary">Heading — DM Sans 600</p>
          <p className="text-xl font-medium text-text-primary">Subheading — DM Sans 500</p>
          <p className="text-base text-text-primary">Body — DM Sans 400 — The quick brown fox jumps over the lazy dog</p>
          <p className="text-sm text-text-secondary">Small secondary text — patient vitals, timestamps</p>
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Label / Caption</p>
          <p className="font-mono text-sm text-text-secondary">NHIS-0001-LG · DM Mono — for IDs, codes, values</p>
        </div>
      </section>

      <div className="border-t border-border pt-6 pb-2">
        <p className="text-xs text-text-muted text-center">HMS Design System · Sprint 01 Complete · Ready for Sprint 02</p>
      </div>
    </div>
  );
}
