import * as React from 'react';
import NextLink from 'next/link';
import {
  Theme,
  themePropDefs,
  //
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  //
  AspectRatio,
  //
  Avatar,
  avatarPropDefs,
  //
  Badge,
  badgePropDefs,
  //
  Blockquote,
  blockquotePropDefs,
  //
  Box,
  //
  Button,
  buttonPropDefs,
  //
  CalloutRoot,
  CalloutIcon,
  CalloutText,
  calloutRootPropDefs,
  //
  Card,
  cardPropDefs,
  //
  Checkbox,
  checkboxPropDefs,
  //
  Code,
  codePropDefs,
  //
  Container,
  //
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuItem,
  ContextMenuGroup,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuCheckboxItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuSeparator,
  contextMenuContentPropDefs,
  //
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  dialogContentPropDefs,
  //
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
  dropdownMenuContentPropDefs,
  //
  Em,
  Flex,
  Grid,
  //
  Heading,
  headingPropDefs,
  //
  HoverCardRoot,
  HoverCardTrigger,
  HoverCardContent,
  hoverCardContentPropDefs,
  //
  IconButton,
  iconButtonPropDefs,
  //
  Inset,
  //
  Kbd,
  kbdPropDefs,
  //
  Link,
  linkPropDefs,
  //
  PopoverRoot,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
  //
  Quote,
  //
  RadioGroupRoot,
  RadioGroupItem,
  radioGroupPropDefs,
  //
  ScrollArea,
  scrollAreaPropDefs,
  //
  Section,
  //
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  selectRootPropDefs,
  selectTriggerPropDefs,
  selectContentPropDefs,
  //
  Separator,
  //
  Slider,
  sliderPropDefs,
  //
  Strong,
  //
  Switch,
  switchPropDefs,
  //
  TableRoot,
  TableHeader,
  TableRow,
  TableColumnHeaderCell,
  TableBody,
  TableRowHeaderCell,
  TableCell,
  tableRootPropDefs,
  //
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListPropDefs,
  //
  TextArea,
  textAreaPropDefs,
  //
  TextFieldRoot,
  TextFieldSlot,
  TextFieldInput,
  textFieldPropDefs,
  //
  Text,
  textPropDefs,
  //
  Tooltip,
  //
  // helpers:
  themeAccentColorsOrdered,
  useThemeContext,
  //
  ThemePanel,
} from '@radix-ui/themes';
// import {
//   ArrowRightIcon,
//   CaretDownIcon,
//   InfoCircledIcon,
//   MagnifyingGlassIcon,
//   StarIcon,
// } from '@radix-ui/react-icons';
// import { getPeopleForColor } from '@lib/people';
import styles from './playground.module.css';
import { MobileMenuProvider, MobileMenu } from '@/components/MobileMenu';
import { ThemesHeader } from '@/components/ThemesHeader';
// import { ThemesPanelBackgroundImage } from '@/components/ThemesPanelBackgroundImage';
import { useTheme } from 'next-themes';
import { TitleAndMetaTags } from '@/components/TitleAndMetaTags';
import Head from 'next/head';
import { ThemesMobileMenu } from '@/components/ThemesMobileMenu';

export default function Home() {
  const { systemTheme, setTheme } = useTheme();

  const {
    onAccentColorChange,
    onGrayColorChange,
    onRadiusChange,
    onScalingChange,
    onPanelBackgroundChange,
  } = useThemeContext();

  // When the page unmounts, reset theme settings to match the default applied to `/themes` section
  // so they don't persist on other pages.
  React.useEffect(() => {
    return () => {
      onAccentColorChange('indigo');
      onGrayColorChange(themePropDefs.grayColor.default);
      onRadiusChange(themePropDefs.radius.default);
      onScalingChange(themePropDefs.scaling.default);
      onPanelBackgroundChange(themePropDefs.panelBackground.default);
    };
  }, []);

  return (
    <MobileMenuProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <TitleAndMetaTags
        title="Playground – Radix Themes"
        description="An open source component library for building modern React apps that helps you build faster and makes it easy to create beautiful, accessible interfaces that are a breeze to maintain."
        image="themes.png"
      />

      <div className={styles.PlaygroundRoot}>
        {/* Set default values for settings we don't want affecting the header */}
        <Theme radius="medium" scaling="100%">
          <MobileMenu>
            <ThemesHeader />
          </MobileMenu>
          x
          <ThemesHeader />
          <ThemesMobileMenu />
        </Theme>

        <Box display={{ initial: 'none', lg: 'block' }}>
          <ThemePanel
            onAppearanceChange={(newTheme) => {
              const newThemeMatchesSystem = newTheme === systemTheme;
              setTheme(newThemeMatchesSystem ? 'system' : (newTheme as 'light' | 'dark'));
            }}
            style={{
              top: 'var(--header-height)',
              maxHeight: 'calc(100vh - var(--header-height) - var(--space-4) * 2)',
            }}
          />
        </Box>

        <Section size={{ initial: '2', md: '3' }}>
          <Flex direction="column" gap="9" mx={{ initial: '5', xs: '6', sm: '7', md: '9' }}>
            <PlaygroundSection>
              <Flex align="baseline" gap="4" mt="2">
                <Heading id="alert-dialog">
                  <Link color="gray" underline="hover" highContrast href="#alert-dialog">
                    Alert Dialog
                  </Link>
                </Heading>
                <NextLink passHref legacyBehavior href="/themes/docs/components/alert-dialog">
                  <Link className={styles.PlaygroundDocsLink} size="2">
                    View in docs
                  </Link>
                </NextLink>
              </Flex>
              <Flex gap="4" align="center">
                <AlertDialogRoot>
                  <AlertDialogTrigger>
                    <Button size="1">Open</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent size="1" style={{ width: 'calc(300px * var(--scaling))' }}>
                    <AlertDialogTitle size="2" mb="1">
                      Revoke access
                    </AlertDialogTitle>
                    <AlertDialogDescription size="1" mb="3">
                      Are you sure? This application will no longer be accessible and any existing
                      sessions will be expired.
                    </AlertDialogDescription>

                    <Flex gap="2" mt="3" justify="end">
                      <AlertDialogCancel>
                        <Button size="1" variant="soft" color="gray">
                          Cancel
                        </Button>
                      </AlertDialogCancel>
                      <AlertDialogAction>
                        <Button size="1" color="red">
                          Revoke
                        </Button>
                      </AlertDialogAction>
                    </Flex>
                  </AlertDialogContent>
                </AlertDialogRoot>

                <AlertDialogRoot>
                  <AlertDialogTrigger>
                    <Button size="2">Open</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent size="2" style={{ width: 'calc(400px * var(--scaling))' }}>
                    <AlertDialogTitle mb="2">Revoke access</AlertDialogTitle>
                    <AlertDialogDescription size="2" mb="4">
                      Are you sure? This application will no longer be accessible and any existing
                      sessions will be expired.
                    </AlertDialogDescription>

                    <Flex gap="3" mt="4" justify="end">
                      <AlertDialogCancel>
                        <Button variant="soft" color="gray">
                          Cancel
                        </Button>
                      </AlertDialogCancel>
                      <AlertDialogAction>
                        <Button color="red">Revoke</Button>
                      </AlertDialogAction>
                    </Flex>
                  </AlertDialogContent>
                </AlertDialogRoot>

                <AlertDialogRoot>
                  <AlertDialogTrigger>
                    <Button size="3">Open</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent size="3" style={{ width: 'calc(400px * var(--scaling))' }}>
                    <AlertDialogTitle>Revoke access</AlertDialogTitle>
                    <AlertDialogDescription size="2" mb="4">
                      Are you sure? This application will no longer be accessible and any existing
                      sessions will be expired.
                    </AlertDialogDescription>

                    <Flex gap="3" mt="4" justify="end">
                      <AlertDialogCancel>
                        <Button variant="soft" color="gray">
                          Cancel
                        </Button>
                      </AlertDialogCancel>
                      <AlertDialogAction>
                        <Button color="red">Revoke</Button>
                      </AlertDialogAction>
                    </Flex>
                  </AlertDialogContent>
                </AlertDialogRoot>

                <AlertDialogRoot>
                  <AlertDialogTrigger>
                    <Button size="4">Open</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent size="4" style={{ width: 'calc(450px * var(--scaling))' }}>
                    <AlertDialogTitle size="6">Revoke access</AlertDialogTitle>
                    <AlertDialogDescription size="3" mb="5">
                      Are you sure? This application will no longer be accessible and any existing
                      sessions will be expired.
                    </AlertDialogDescription>

                    <Flex gap="3" mt="5" justify="end">
                      <AlertDialogCancel>
                        <Button size="3" variant="soft" color="gray">
                          Cancel
                        </Button>
                      </AlertDialogCancel>
                      <AlertDialogAction>
                        <Button size="3" color="red">
                          Revoke
                        </Button>
                      </AlertDialogAction>
                    </Flex>
                  </AlertDialogContent>
                </AlertDialogRoot>
              </Flex>
            </PlaygroundSection>
          </Flex>
        </Section>
      </div>
    </MobileMenuProvider>
  );
}

const PlaygroundSection: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <Flex
    className={styles.PlaygroundSection}
    direction="column"
    gap="5"
    mb={{ initial: '5', sm: '8' }}
  >
    {children}
  </Flex>
);
