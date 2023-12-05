import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Terms() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Terms</DialogTitle>
          <DialogDescription>
            By using this site you agree to the terms and conditions
          </DialogDescription>
          
        </DialogHeader>
        <div className="my-4 relative" />
        <div className="flex flex-col gap-y-4">
            We do not store any of your data. We use cookies to store your session.
            <br />
            <br />
            We do not sell your data.
            <br />
            <br />
            No database is used to store your data.
            </div>
        <DialogFooter>
          <Button type="submit">Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
