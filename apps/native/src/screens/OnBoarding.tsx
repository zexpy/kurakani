import { Image } from "react-native"
import Onboarding from "react-native-onboarding-swiper"

const OnBoarding = ({ navigation }) => {
    return (
        <Onboarding
            onSkip={() => navigation.replace("login")}
            onDone={() => navigation.navigate("login")}
            pages={[
                {
                    backgroundColor: "#3d9996",
                    image: (
                        <Image
                            source={require("../../assets/onboarding_1.png")}
                            className="h-60 w-60"
                        />
                    ),
                    title: "EXPLORE",
                    subtitle: "Embrace a new way to connect with the world",
                },
                {
                    backgroundColor: "#e9bcbe",
                    image: (
                        <Image
                            source={require("../../assets/onboarding_2.png")}
                            className="h-60 w-60"
                        />
                    ),
                    title: "FRIENDS AWAIT!",
                    subtitle: "Connecting you to the world, one friend at a time",
                },
            ]}
        />
    )
}

export default OnBoarding
