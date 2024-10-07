'use client'
import { useToast } from "@/components/hooks/use-toast"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../components/auth/AuthProvider'
import { changePassword, deleteAccount, getProfile, ProfileProps, updateProfile } from '../service/action'
import ChangePasswordForm from '../../components/profile/ChangePasswordForm'
export default function Page() {
  const router = useRouter();
  const { toast } = useToast()
  const [user, setUser] = useState<ProfileProps | null>(null)
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false)
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null)
  const { logout } = useAuth();
  const GetUser = async () => {
    try{
        const response = await getProfile();
        setUser(response);
    }catch(error){
        console.error(error);
    }
  }
    useEffect(() => {
        GetUser();
    }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser(prev => prev ?  ({ ...prev, [name]: value }) : null)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfilePicFile(file)
  }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    const formData = new FormData()
    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('phoneNumber', user.phoneNumber)
   if(profilePicFile){
        formData.append('profilePic', profilePicFile)
   }
    try{
        await updateProfile(formData);
        toast({
          title: "Profile updated",
          description: "Your profile has been updated",
        })
    }catch(error){
        if(error instanceof AxiosError){
          toast({
            title: "Error",
            description: error.response?.data.message,
            variant: "destructive",
          })
        }
    }
  }
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
      if(fileInputRef.current){
        fileInputRef.current.click();
    }
  }
  const handleChangePassword = async (currentPassword: string, newPassword: string) => {
    try{
       await changePassword({currentPassword, newPassword});
      toast({
        title: "Password changed",
        description: "Your password has been changed",
      })
    }catch(error){
      if(error instanceof AxiosError){
        toast({
          title: "Error",
          description: error.response?.data.message,
          variant: "destructive",
        })
      }
    }
  }
  const handleDeleteAccount = async () => {
    try{
      await deleteAccount();
      logout();
      toast({
        title: "Account deleted",
        description: "Your account has been deleted",
      })
      router.push('/login');
    }catch(error){
      if(error instanceof AxiosError){
        toast({
          title: "Error",
          description: error.response?.data.message,
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
     
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user?.profilePic} alt={user?.name} />
                  <AvatarFallback>{user?.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <Input
                    type="file"
                    id="avatar"
                    className='hidden'
                    accept="image/*"
                    onChange={handleAvatarChange}
                    ref={fileInputRef}
                  />
                  <Label htmlFor="avatar" className="cursor-pointer">
                    <Button variant="outline" type="button" onClick={handleButtonClick}>
                      Change Avatar
                    </Button>
                  </Label>
                </div>
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={user?.name} 
                  onChange={handleInputChange} 
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={user?.email} 
                  onChange={handleInputChange} 
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone</Label>
                <Input 
                  id="phoneNumber" 
                  name="phoneNumber" 
                  type="tel" 
                  value={user?.phoneNumber} 
                  onChange={handleInputChange} 
                />
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">Change Password</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                  </DialogHeader>
                  <ChangePasswordForm 
                    onSubmit={handleChangePassword}
                    onCancel={() => setIsChangePasswordOpen(false)}
                  />
                </DialogContent>
              </Dialog>
              <AlertDialog open={isDeleteAccountOpen} onOpenChange={setIsDeleteAccountOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount}>Delete Account</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}