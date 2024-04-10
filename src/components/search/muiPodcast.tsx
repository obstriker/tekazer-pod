import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import CircularProgress from '@mui/joy/CircularProgress';
import Chip from '@mui/joy/Chip';
import Close from '@mui/icons-material/Close';
import {ListItemDecorator, ListItemContent, AutocompleteOption, Autocomplete} from '@mui/joy';
import { useState, useEffect } from 'react';
import { Avatar, Stack } from '@mui/material';
import Image from 'next/image'

interface SubmitSectionProps {
  handleRssSubmit: (rssUrl: string) => void
}

const renderList = (props: any, option: any) => (
    <AutocompleteOption {...props}   slotProps={{
        root: {
          className: 'bg-blue-200 hover:bg-blue-400 border-t',
        },
      }}>
      <ListItemDecorator>
        <Image
          loading="lazy"
          width="50"
          srcSet={option.image}
          src={option.image}
          className='rounded-full'
          alt=""
        />
      </ListItemDecorator>
      <ListItemContent sx={{ fontSize: 'md', padding: 2}} >
        {option.title}
      </ListItemContent>
    </AutocompleteOption>
  )

const renderTagBox = (tags: any, getTagProps: any) => (
    tags.map((item: any, index: any) => (
            <Chip
                variant="outlined"
                color="primary"
                endDecorator={<Close />}
                sx={{ minWidth: 0, padding: 0.5, maxWidth: "14rem"}}
                {...getTagProps({ index })} >
                <Stack direction="row" spacing={1}>
                    <Avatar src={item.image} />
                    <span className='flex items-center'>{item.title}</span>
                </Stack>
            </Chip>
        ))
)

export default function MuiPodcast({handleRssSubmit}: any) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPodcast, setSelectedPodcast] = useState([]);
  const [isPodcastSelected, setIsPodcastSelected] = useState(false);

    const selectPodcast = (event: any, value: any) => {
      if (Array.isArray(value))
      {
        if(Object.keys(value).length > 0)
        {
          const rss = value[0]
          setSelectedPodcast(rss)
          setIsPodcastSelected(true)
          handleRssSubmit(value[0].rss)
        }
        else
        {
          setSelectedPodcast([])
          setIsPodcastSelected(false)
        }
      }
    }

    useEffect(() => 
    {
        const getPodcastSearchResults = async (q: string) => {
            try {
                const response = await fetch("/api/search/podcast?q=" + q, {
                    method: "GET"
                }).then((res) => res.json())
                .then((data) => {
                    setOptions(data)
                    return data
                })
            } catch (error) {
                console.error(error);
                alert("Request failed");
            }
        };

        getPodcastSearchResults(searchTerm);
    }, [searchTerm])

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <FormControl id="asynchronous-demo">
        
      <Autocomplete
        placeholder="Search for podcasts..."
        open={open}
        onOpen={() => { if(!isPodcastSelected){setOpen(true)}}}
        onClose={() => {setOpen(false)}}
        onChange={selectPodcast}
        getOptionDisabled={(option) => Object.keys(selectedPodcast ? selectedPodcast : []).length > 0}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        onInputChange={(event, searchTerm) => {setSearchTerm(searchTerm)}}
        options={options}
        loading={loading}
        slotProps={{
          root: {
            className: 'p-3',
          },
          input:{
           readOnly: isPodcastSelected,
           placeholder: isPodcastSelected ? "" : "Select a Podcast..."
          }
        }}
          autoHighlight
          
          getOptionLabel={(option) => option.title}
          renderOption={renderList}
          renderTags={renderTagBox}
        endDecorator={
          loading ? (
            <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
          ) : null
        }
        multiple
        clearOnEscape />
    </FormControl>
  );
}