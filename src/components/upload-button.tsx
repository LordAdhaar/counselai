"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button";
  

export default function UploadButton(){
    
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return(

        <Dialog 
            open={isOpen} 
            onOpenChange={(v) => {
                if(!v){
                    setIsOpen(v)
                }
        }}>
            <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <Button variant="default"> Upload PDF</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>

        </Dialog>

    )
}