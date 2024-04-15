import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import CircularProgress from '@mui/joy/CircularProgress';
import Chip from '@mui/joy/Chip';
import Close from '@mui/icons-material/Close';
import {ListItemDecorator, ListItemContent, AutocompleteOption, Autocomplete} from '@mui/joy';
import { useState, useEffect } from 'react';
import { Avatar, Stack } from '@mui/material';
import Image from 'next/image'

export interface Episode{
  id: string,
  title: string,
  rss: string,
  image?: string,
  description?: string
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
          width={50}
          height={50}
          src={option.image ?? "/favicon.ico"}
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
                key={item.id}
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

const MuiEpisode = ({rss, handleEpisode}: {rss: any, handleEpisode: Function}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState<Episode>({} as Episode);
  const [isEpisodeSelected, setIsEpisodeSelected] = useState(false);
  
    const selectEpisode = (event: any, value: any) => {
      if (Array.isArray(value) && value.length > 0) {
        const episode: Episode = {
          id: value[0].id,
          title: value[0].title,
          rss: value[0].rss,
          image: value[0].image,
          description: value[0].description
        };
        setSelectedEpisode(episode);
        setIsEpisodeSelected(true);
        handleEpisode(episode);
      } else {
        setSelectedEpisode({} as Episode);
        setIsEpisodeSelected(false);
      }
    }
    const getEpisodeResults = async (rss: any) => {
      try {
          const response = await fetch("/api/search/podcast/episode?rss=" + rss, {
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
        placeholder="Search for episode..."
        open={open}
        onOpen={() => { if(!isEpisodeSelected){setOpen(true); getEpisodeResults(rss)}}}
        onClose={() => {setOpen(false)}}
        onChange={selectEpisode}
        getOptionDisabled={(option) => Object.keys(selectedEpisode ? selectedEpisode : []).length > 0}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        onInputChange={(event, searchTerm) => {setSearchTerm(searchTerm)}}
        options={options}
        loading={loading}
        slotProps={{
          root: {
            className: 'p-3',
          },
          input:{
           readOnly: isEpisodeSelected,
           placeholder: isEpisodeSelected ? "" : "Select an Episode..."
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

export default MuiEpisode