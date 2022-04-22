import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Avatar, AvatarBadge, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Divider, Flex, FormControl, IconButton, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Spacer, Stack, useDisclosure, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import { IoExit } from "react-icons/io5";
import { MdPhone } from "react-icons/md";



function Rutero() {


    return (


        <Box bg='Background' w='100%' p={1} color='black'>

            <Flex padding={1}>
                <Box > </Box>


                <Spacer />

                <Box paddingRight={5} >


                    <Menu>
                        <MenuButton as={IconButton} colorScheme='Background'>
                            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov'>
                                <AvatarBadge boxSize='1em' bg='green.500' />
                            </Avatar>
                        </MenuButton>
                        <MenuList>
                            <MenuGroup title='Perfil'>
                                <MenuItem>Mi cuenta</MenuItem>

                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup title='Otros'>
                                <MenuItem>...</MenuItem>
                                <MenuItem>...</MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                    
                    <IconButton
                        paddingLeft={5}
                        colorScheme='white'
                        aria-label='Salir'
                        fontSize='30px'
                        icon={<IoExit />}
                    />

                </Box>
            </Flex>


            <Breadcrumb
                style={{ display: "flex", alignItems: "center" }}
                h="100%"
                px="2rem"
                spacing="8px"
                textColor="white"
                separator={<ChevronRightIcon color="white" />}
            >

            </Breadcrumb>
        </Box>
    );
}

export default Rutero;