import {styled} from "tamagui";
import {Text, View, YStack, XStack, Input, Button} from "tamagui";

export const Card = styled(YStack, {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderRadius: "$4",
    padding: "$6",
    space: "$5",
    width: "100%",
    maxWidth: 400,

    shadowColor: "rgba(0, 0, 0, 0.12)",
    shadowOffset: {
        width: 0,
        height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 4,

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",

});

export const Title = styled(Text, {
    color: "$primary",
    fontSize: "$9",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: -0.5,
});

export const Subtitle = styled(Text, {
    color: "$secondary",
    fontSize: "$4",
    textAlign: "center",
    opacity: 0.8,
});

export const StyledInput = styled(Input, {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderColor: "$secondary",
    borderRadius: "$3",
    fontSize: "$4",
    padding: "$4",
    marginVertical: "$2",

    // 포커스 상태 스타일
    hoverStyle: {
        borderColor: "$primary",
    },
    focusStyle: {
        borderColor: "$primary",
        borderWidth: 2,
    },
});

export const LoginButton = styled(Button, {
    backgroundColor: "$primary",
    borderRadius: "$3",
    paddingVertical: "$4",
    marginTop: "$2",

    // 상호작용 스타일
    pressStyle: {
        opacity: 0.8,
    },
    hoverStyle: {
        backgroundColor: "$primaryDark",
        opacity: 0.9,
    },
});

export const Divider = styled(XStack, {
    alignItems: "center",
    marginVertical: "$4",
    space: "$4",

    // 구분선 스타일
    borderTopWidth: 1,
    borderColor: "$secondary",
    opacity: 0.2,
});
