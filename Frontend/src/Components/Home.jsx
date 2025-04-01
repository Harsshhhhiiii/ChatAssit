import React from "react";
import { Card,CardContent } from "./ui/card";
import Header from "./HomePageComponents/Header";
import Menu from "./HomePageComponents/Menu/Menu";
import Groups from "./HomePageComponents/Groups/Group";
import Escalations from "./HomePageComponents/Escalations/Escalations";
import Insights from "./HomePageComponents/Insights/Insights";
import Tasks from "./HomePageComponents/Tasks/Tasks";


const Home = () => {

  

  // Data for escalations
  const escalations = [
    {
      title: "Channel the playground is ..",
      group: "Alpha Conclave",
      user: "Sagar SK",
      userIcon:
        "/image-of-a-man-on-his--cafe-racer-motorcycle-with-his-helmet-on.svg",
      isUrgent: true,
    },
    {
      title: "There is an issue with this ..",
      group: "Beta Den",
      user: "Alex",
      userIcon:
        "/image-of-a-man-on-his--cafe-racer-motorcycle-with-his-helmet-on.svg",
      isUrgent: false,
    },
  ];

  // Data for menu items
  const menuItems = [
    {
      name: "Dashboard",
      icon: "/---icon--dashboard-.svg",
      count: 2,
      isActive: true,
    },
    {
      name: "Insights",
      icon: "/---icon--insights-.svg",
      count: 0,
      isActive: false,
    },
    {
      name: "Tasks",
      icon: "/---icon--pencil--1.svg",
      count: 0,
      isActive: false,
    },
    {
      name: "Sales",
      icon: "/group-1.svg",
      count: 0,
      isActive: false,
    },
  ];

  // Data for AI suggestions
  const aiSuggestions = [
    {
      icon: "/---icon--pencil-.png",
      text: 'what are my\ntasks due today',
    },
    {
      icon: "/---icon--person-.png",
      text: 'what\'s happening \nwith xyz client',
    },
    {
      icon: "/---icon--question-.png",
      text: 'who has been sick\nthe most',
    },
  ];

  return (
    <div className="w-screen min-h-screen overflow-hidden">
      <div className="relative w-full min-h-[1166px] bg-gradient-to-b from-white to-[#e7ffc9]">
        {/* Header Card */}
        <Card className="absolute w-[90%] h-[130px] top-11 left-[5%] rounded-[23px] border-[#8a8a8a]">
          <CardContent className="p-0">
            <Header/>
          </CardContent>
        </Card>

        {/* Menu Card */}
        <div className="absolute w-full top-[191px] left-0 px-[2.5%]">
          <div className="flex flex-wrap gap-6">
            <Card className="w-[348px] h-[813px] rounded-[23px] border-[#8a8a8a]">
              <CardContent className="p-0">
                <Menu menuItems={menuItems} />
              </CardContent>
            </Card>

            <div className="flex-1 grid grid-cols-3 gap-6 min-w-[900px]">
              <Card className="h-[304px] rounded-[23px] border-[#8a8a8a]">
                <CardContent className="p-0">
                  <Groups/>
                </CardContent>
              </Card>

              <Card className="h-[304px] rounded-[23px] border-[#8a8a8a] overflow-hidden">
                <CardContent className="p-0 h-full">
                  <Tasks/>
                </CardContent>
              </Card>

              <Card className="h-[304px] rounded-[23px] border-[#8a8a8a]">
                  <CardContent className="p-0">
                    <Escalations escalations={escalations}/>
                  </CardContent>
                </Card>

              <Card className="col-span-3 h-[480px] rounded-[23px] border-[#8a8a8a]">
                <CardContent className="p-0 h-full">
                  <Insights aiSuggestions={aiSuggestions}/>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;