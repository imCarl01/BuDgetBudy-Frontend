import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get("window")

export default function OnboardingScreen() {
    const navigation = useNavigation();
    function handleToLoginPage(){
        navigation.navigate("Login")
    }
  return (
    <Onboarding
    onDone={handleToLoginPage}
    onSkip={handleToLoginPage}
    bottomBarColor="white"
            pages={[
                {
                backgroundColor: '#fff',
                image: (
                    <View style={styles.imageContainer}>
                        <Image source={require("./Image/manage_money.png")}
                        style={styles.imageSection}
                         resizeMode='contain'
                        />
                    </View>
                    ),
                title: ( 'BudgetBuddy'),
                subtitle: 'Take control of your finances with ease.',
                
                },
                {
                    backgroundColor: '#fff',
                    image: (
                        <View style={styles.imageContainer}>
                            <Image source={require("./Image/Track_money.png")}
                            style={styles.imageSection}
                             resizeMode='contain'
                            />
                        </View>
                        ),
                    title: 'Track Your Money',
                    subtitle: 'Easily log your income and expenses to keep a clear view of your finances',
                    
                },
                {
                    backgroundColor: '#fff',
                    image: (
                        <View style={styles.imageContainer}>
                            <Image source={require("./Image/budget_money.png")}
                            style={styles.imageSection}
                             resizeMode='contain'
                            />
                        </View>
                        ),
                    title: 'Set Budgets & Save More',
                    subtitle: 'Plan your spending and track your progress to stay within your budget.',
                    
                    },

       
            ]}
            
    />
  )
}

const styles = StyleSheet.create({
    imageContainer:{
        width:width,
        height:height* 0.4,
        justifyContent:"center",
        alignItems:"center"
    },
    imageSection:{
       width:"100%",
       height:"100%",
      
    },
})