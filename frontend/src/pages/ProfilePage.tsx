// import type React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

const ProfilePage = () => {

    const [detailsState, setdetailsState] = useState("")

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken")

        const fetchUserDetails = async () => {
            const HTTPresponse = await fetch("http://localhost:3000/api/auth/profile", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })

            const data = await HTTPresponse.json()
            const api_key =data.response.payload.api_key
            setdetailsState(api_key)
        }
        fetchUserDetails()
    }, [])

  return (
    <div className={cn("flex flex-col gap-6 w-[400px]")} >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Profile</CardTitle>
          <CardDescription>Hello dude</CardDescription>
        </CardHeader>
        <CardContent>
          <form >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">This is your api key:</Label>
                <p>{detailsState}</p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage