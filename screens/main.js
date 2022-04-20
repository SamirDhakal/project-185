import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, Image, ScrollView, TouchableOpacity } from "react-native-web";
import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import * as FaceDetector from "expo-face-detector";
import Filter1 from "./filter1";
import Filter2 from "./filter2";
import Filter3 from "./filter3";
import Filter4 from "./filter4";
import Filter5 from "./filter5";
import Filter6 from "./filter6";
import Filter7 from "./filter7";
import Filter8 from "./filter8";
import Filter9 from "./filter9";
import Filter10 from "./filter10";
import Filter11 from "./filter11";
import Filter12 from "./filter12";

let data = {
    Crown: [
        {id: "crown-pic1", src: require("../PRO-LookMeAppFilters-main/crown-pic1.png")},
        {id: "crown-pic2", src: require("../PRO-LookMeAppFilters-main/crown-pic2.png")},
        {id: "crown-pic3", src: require("../PRO-LookMeAppFilters-main/crown-pic3.png")}
    ],
    Flowers: [
        {id: "flower-pic1", src: require("../PRO-LookMeAppFilters-main/flower-pic1.png")},
        {id: "flower-pic2", src: require("../PRO-LookMeAppFilters-main/flower-pic2.png")},
        {id: "flower-pic3", src: require("../PRO-LookMeAppFilters-main/flower-pic3.png")}
    ],
    Hats: [
        {id: "hat-pic1", src: require("../PRO-LookMeAppFilters-main/hat-pic1.png")},
        {id: "hat-pic2", src: require("../PRO-LookMeAppFilters-main/hat-pic2.png")}
    ],
    Hair: [
        {id: "hair-pic1", src: require("../PRO-LookMeAppFilters-main/hair-pic1.png")}
    ],
    Other: [
        {id: "other-pic1", src: require("../PRO-LookMeAppFilters-main/other-pic1.png")},
        {id: "other-pic2", src: require("../PRO-LookMeAppFilters-main/other-pic2.png")},
        {id: "other-pic3", src: require("../PRO-LookMeAppFilters-main/other-pic3.png")}
    ]
}

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            faces: []
        }

        this.onFacesDetected = this.onFacesDetected.bind(this);
    }

    async componentDidMount() {
        const {status} = await Camera.requestPermissionsAsync();
        this.setState({
            hasCameraPermission: status === "granted"
        });
    }

    onFacesDetected({faces}) {
        this.setState({
            faces: faces
        });
    }

    onFacesDetectionError = (error) => {
        console.log(error);
    }

    render() {
        return(
            <View>
                <Camera
                style = {{flex: 1}}
                type = {Camera.Constants.Type.front}
                faceDetectorSettings = {{
                    mode: FaceDetector.Constants.Mode.fast,
                    detectLandmarks: FaceDetector.Constants.Landmarks.all,
                    runClassifications: FaceDetector.Constants.Classifications.all
                }}
                onFacesDetected = {this.onFacesDetected}
                onFacesDetectionError = {this.onFacesDetectionError}
                />
                {this.state.faces.map((face) => {
                    if (this.state.currentFilter == 'crown-pic1') {
                        return <Filter1 key={face.faceID} face={face} />;
                    } else if (this.state.currentFilter == 'crown-pic2') {
                        return <Filter2 key={face.faceID} face={face} />;
                    } else if (this.state.currentFilter == 'crown-pic3') {
                        return <Filter3 key={face.faceID} face={face} />;
                    } else if (this.state.currentFilter == 'flower-pic1') {
                        return <Filter4 key={face.faceID} face={face} />;
                    } else if (this.state.currentFilter == 'flower-pic2') {
                        return <Filter5 key={face.faceID} face={face} />;
                    } else if (this.state.currentFilter == 'flower-pic3') {
                        return <Filter6 key={face.faceID} face={face} />;
                    } else if (this.state.currentFilter == 'hat-pic1') {
                        return <Filter7 key={face.faceID} face={face} />;
                    } else if (this.state.currentFilter == 'hat-pic2') {
                        return <Filter8 key={face.faceID} face={face} />;
                    } else if (this.state.currentFilter == 'hair-pic1') {
                        return <Filter9 key={face.faceID} face={face} />;
                    } else if (this.state.currentFilter == 'other-pic1') {
                        return <Filter10 key={face.faceID} face={face} />;
                    } else if (this.state.currentFilter == 'other-pic2') {
                        return <Filter11 key={face.faceID} face={face} />;
                    } else if (this.state.currentFilter == 'other-pic2') {
                        return <Filter12 key={face.faceID} face={face} />;
                    }
                })}
                
                <View>
                    <ScrollView
                        style={{ flexDirection: 'row' }}
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {Object.keys(data).map(category => (
                                <TouchableOpacity
                                key = {`catagory-button-${category}`}
                                onPress={() => {
                                    this.setState({
                                        selected: category,
                                        currentFilter: data[category][0].id,
                                    });
                                }}>
                                <Image
                                    source={filter_data.src}
                                    style={{ height: 32, width: 80 }}
                                />
                                    <Text>{category}</Text>
                                </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
        )
    }
}