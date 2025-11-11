import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@camaras/ui/src/components/dialog";

import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@camaras/ui/src/components/drawer";

import { Button } from "@camaras/ui/src/components/button";
import { Eye } from "lucide-react";
import { UserInfoCard } from "./user-info";

export function ResponsiveUpdateUser() {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  });

  const DesktopDialog = () => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button size={"icon"} className="cursor-pointer">
          <Eye />
        </Button>
      </DrawerTrigger>
      <DialogContent className="sm:max-w-[90dvw] md:max-w-[50dvw] lg:max-w-[40dvw]">
        <DialogHeader>
          <DialogTitle className="text-center">Información General del Usuario</DialogTitle>
        </DialogHeader>
        <UserInfoCard
          onSave={() => {}}
          onCancel={() => {}}
          user ={{
            name: "John Doe",
            phoneNumber: "+123456789",
            email: "example@email.com",
            role: "admin",
          }}
          />
      </DialogContent>
    </Dialog>
  );

  const MobileDrawer = () => (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button size={"icon"} className="cursor-pointer">
          <Eye />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen flex flex-col px-4 py-6">
        <div className="flex-1 overflow-hidden">
          <DrawerHeader>
            <DrawerTitle className="text-center">Información del Usuario</DrawerTitle>
          </DrawerHeader>
          <div className="mt-4 overflow-y-auto max-h-[calc(100vh-450px)] px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <UserInfoCard
          onSave={() => {}}
          onCancel={() => {}}
          user={{
            name: "John Doe",
            phoneNumber: "+123456789",
            email: "example@email.com",
            role: "admin",
          }}
          />
          </div>
        </div>
        <DrawerFooter className="mt-6 flex justify-end">
          <Button
            variant="outline"
            className="rounded-full cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  return isMobile ? <MobileDrawer /> : <DesktopDialog />;
}
