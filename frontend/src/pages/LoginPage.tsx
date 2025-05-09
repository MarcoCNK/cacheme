import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"

export function LoginPage({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const formularioJSX = e.target as HTMLFormElement
    const formValues: FormData = new FormData(formularioJSX)

    const form_state = {
      password: formValues.get("password"),
      name: formValues.get("name")
    }
    console.log(form_state)
    try {
      const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form_state)
      })

      const data = await responseHTTP.json()
      
      const accessToken = data.response.payload.access_token

      if (data.response.ok) {
        console.log(data)
        localStorage.setItem("accessToken", accessToken)
        navigate("/profile")
      }
      
      return
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 w-[400px]", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your name below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">name</Label>
                <Input id="name" type="name" name="name" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" >Password</Label>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
