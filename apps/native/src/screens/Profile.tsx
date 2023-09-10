import Box from '@components/Box'
import { trpc } from '@libs/trpc'
import { Card, Text, H2, Button } from 'tamagui'
export default function Profile() {
    const { isError, data, isLoading, error } = trpc.getUser.useQuery()

    if (isLoading) {
        return (
            <Box>
                <Text>Loading..........</Text>
            </Box>
        )
    }

    return (
        <Box>
            <Card
                backgroundColor="white"
                animation="bouncy"
                pressStyle={{ scale: 0.925 }}
                elevate
            >
                <Card.Header>
                    <H2 color={'white'} textAlign="center">
                        {data.message}
                    </H2>
                </Card.Header>
                <Card.Footer padded alignItems="flex-end">
                    <Button size={'$3'}>Click Me</Button>
                </Card.Footer>
            </Card>
        </Box>
    )
}
