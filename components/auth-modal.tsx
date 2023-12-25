import React from 'react'

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

import { auth } from '@/lib/firebase'
import { signInAnonymously , updateProfile} from 'firebase/auth'

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const AuthModal = ({isOpen , setIsOpen}: Props) => {

  async function onSignIn(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get('username'));

    await signInAnonymously(auth);
    if (auth.currentUser) {
        await updateProfile(auth.currentUser,{
            displayName: username
        });
    }
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter the chat!</DialogTitle>
          <DialogDescription>
            What name do you want to go by ?
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSignIn}>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                Name
                </Label>
                <Input id="username" name='username' className="col-span-3" />
            </div>
            </div>
            <DialogFooter>
            <Button type="submit">Save changes</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal