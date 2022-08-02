import { Button, Box, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    ({pageParam = 1}) => api.get(`/api/images?after=${pageParam}`),
    {
      getNextPageParam: (lastPage) => lastPage?.data.after
    }
  );

  const formattedData = useMemo(() => {
    const pages = data?.pages.map(page => {
      return page.data.data
    })

    return pages?.flat()
  }, [data]);

  if(isLoading) {
    return <Loading />
  }

  if(isError) {
    return <Error />
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && <Button mt='40px' onClick={() => fetchNextPage()}>Carregar mais</Button>}
        {isFetchingNextPage && <Text fontSize="sm" mt="5px">Carregando...</Text>}
      </Box>
    </>
  );
}
