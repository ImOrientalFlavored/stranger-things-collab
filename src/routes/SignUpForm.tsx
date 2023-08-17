/// <reference types="vite-plugin-svgr/client" />
import { Container, Grid, Box, Typography, Stack, /*}, FormControl, InputLabel, OutlinedInput*/ 
FormControl,
InputLabel,
OutlinedInput} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { FC, MouseEvent, useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { literal, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import { ReactComponent as GoogleLogo } from '../assets/google.svg';
import { ReactComponent as GitHubLogo } from '../assets/github.svg';
import { LinkItem, OauthMuiLink } from './SignInForm';
//import { useNavigate } from 'react-router-dom';
//import { useTheme } from '@emotion/react';
//import { tokens } from '../theme';
//import CustomTheme from '../types/CustomTheme';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import IconButton from '@mui/material/IconButton/IconButton';
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { registerUser } from '../api/user';
import UserType from '../types/UserType';
// 👇 SignUp Schema with Zod
const signupSchema = object({
  username: string().min(1, 'Username is required').max(70),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  persistUser: literal(true||false).optional(),
});

// 👇 Infer the Schema to get TypeScript Type
type ISignUp = TypeOf<typeof signupSchema>;

const SignUpForm: FC = () => {
  //const navigate = useNavigate();
  //const theme = useTheme() as CustomTheme;
 // const colors = tokens(theme.palette.mode);
  const [username, setUsername] = useState('')
  const [pw, setPw] = useState({
    password: "",
    showPassword: false,
  });


  // 👇 Default Values
  const defaultValues: ISignUp = {
    username: '',
    password: '',
  };

  // 👇 Object containing all the methods returned by useForm
  const methods = useForm<ISignUp>({
    resolver: zodResolver(signupSchema),
    defaultValues,
  });

  // 👇 Form Handler
  const onSubmitHandler: SubmitHandler<ISignUp> = (values: ISignUp) => {
    console.log(values);
    console.log(JSON.stringify(values, null, 4));
    const user = values as unknown as UserType;
    const response = registerUser(user);
    console.log(response);
    
  };

  const handleSubmitForm = (e: 
    MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const et = e.target as HTMLElement;
    const parent = et.parentElement as HTMLFormElement;
    console.log(et.parentElement);
    const formData = new FormData(parent);
    const data = Object.fromEntries(formData) as unknown as {password:string, username:string, persistUser?: true | undefined};
    console.log(data);
    onSubmitHandler(data);
  };
  
  const handleClickShowPassword = () => {
    setPw({ ...pw, showPassword: !pw.showPassword });
  };

  const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };
  
/*
  const handlePasswordChange = (prop: string) => (event: React.ChangeEvent) => {
    const et = event.target as HTMLButtonElement;
    setPw({ ...pw, [prop]: et.value });
  };
*/
  // 👇 Returned JSX
  return (
    <Container
      maxWidth={false}
      sx={{ height: '100vh', backgroundColor: {  } }}
    >
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ width: '100%', height: '100%' }}
      >
        <Grid
          item
          sx={{ maxWidth: '70rem', width: '100%',  }}
        >
          <Grid
            container
            sx={{
              boxShadow: { sm: '0 0 5px #ddd' },
              py: '6rem',
              px: '1rem',
            }}
          >
            <FormProvider {...methods}>
              <Typography
                variant='h4'
                component='h1'
                sx={{
                  textAlign: 'center',
                  width: '100%',
                  mb: '1.5rem',
                  pb: { sm: '3rem' },
                }}
              >
                Welcome To Pat's Site
              </Typography>
              <Grid
                item
                container
                justifyContent='space-between'
                rowSpacing={5}
                sx={{
                  maxWidth: { sm: '45rem' },
                  marginInline: 'auto',
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ borderRight: { sm: '1px solid #ddd' } }}
                >
                  <Box
                    display='flex'
                    flexDirection='column'
                    component='form'
                    noValidate
                    autoComplete='on'
                    sx={{ paddingRight: { sm: '3rem' } }}
                    onSubmit={methods.handleSubmit(console.log)}
                  >
                    <Typography
                      variant='h6'
                      component='h1'
                      sx={{ textAlign: 'center', mb: '1.5rem' }}
                    >
                      Create new your account
                    </Typography>

                    <FormInput
                      label='Username'
                      type='text'
                      name='username'
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      focused
                      required
                    />
{/*
                    <FormInput
                      label='Password'
                      name='password'
                      type={pw.showPassword ? "text" : "password"}
                      onChange={handlePasswordChange("password")}
                      value={pw.password}
                      required
                      focused
                    />
              */}                  
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={pw.showPassword ? 'text' : 'password'}
                        value={pw.password}
                        name='password'
                        required
                        
                        onChange={e => setPw({ password: e.target.value, showPassword: pw.showPassword })}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {pw.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  
                    <LoadingButton
                      loading={false}
                      type='submit'
                      onClick={(e)=>handleSubmitForm(e)}
                      variant='outlined'
                      sx={{
                        py: '0.8rem',
                        mt: 2,
                        width: '80%',
                        marginInline: 'auto',
                      }}
                    >
                      Sign Up
                    </LoadingButton>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} sx={{}}>
                  <Typography
                    variant='h6'
                    component='p'
                    sx={{
                      paddingLeft: { sm: '3rem' },
                      mb: '1.5rem',
                      textAlign: 'center',
                    }}
                  >
                    Sign up using another provider:
                  </Typography>
                  <Box
                    display='flex'
                    flexDirection='column'
                    sx={{ paddingLeft: { sm: '3rem' }, rowGap: '1rem' }}
                  >
                    <OauthMuiLink href=''>
                      <GoogleLogo style={{ height: '2rem' }} />
                      Google
                    </OauthMuiLink>
                    <OauthMuiLink href=''>
                      <GitHubLogo style={{ height: '2rem' }} />
                      GitHub
                    </OauthMuiLink>
                  </Box>
                </Grid>
              </Grid>
              <Grid container justifyContent='center'>
                <Stack sx={{ mt: '3rem', textAlign: 'center' }}>
                  <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
                    Already have an account? <LinkItem to='/sign-in'>Login</LinkItem>
                  </Typography>
                </Stack>
              </Grid>
            </FormProvider>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default SignUpForm;