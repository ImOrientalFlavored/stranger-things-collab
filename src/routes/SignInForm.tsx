import {
  Container,
  Grid,
  Box,
  Typography,
  Stack,
  Link as MuiLink,
  FormControlLabel,
  Checkbox,
  //colors,
} from '@mui/material';
import { 
  useForm,
  //SubmitHandler, 
  FormProvider } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { FC, FormEvent, useState } from 'react';
import { Link,useNavigate, useOutletContext } from 'react-router-dom';
import { literal, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import { ReactComponent as GoogleLogo } from '../assets/google.svg';
import { ReactComponent as GitHubLogo } from '../assets/github.svg';
import styled from '@emotion/styled';
//import { useTheme } from '@emotion/react';
//import CustomTheme from '../types/CustomTheme';
//import { tokens } from '../theme';
import { loginUser, setLocalUser } from '../api/user';
import UserType from '../types/UserType';
import { setLocalToken, setUserToken } from '../api';
import React from 'react';
  
  // 👇 Styled React Route Dom Link Component
  export const LinkItem = styled(Link)`
    text-decoration: none;
    color: #3683dc;
    &:hover {
      text-decoration: underline;
      color: #5ea1b6;
    }
  `;
  
  // 👇 Styled Material UI Link Component
  export const OauthMuiLink = styled(MuiLink)`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f6f7;
    border-radius: 1;
    padding: 0.6rem 0;
    column-gap: 1rem;
    text-decoration: none;
    color: #393e45;
    font-weight: 500;
    cursor: pointer;
  
    &:hover {
      background-color: #fff;
      box-shadow: 0 1px 13px 0 rgb(0 0 0 / 15%);
    }
  `;
  
  // 👇 Login Schema with Zod
  const loginSchema = object({
    name: string().min(3).max(20),
    password: string()
      .min(1, 'Password is required')
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    persistUser: literal(true).optional(),
  });
  
  // 👇 Infer the Schema to get the TS Type
  type ILogin = TypeOf<typeof loginSchema>;
  
  const SignInForm: FC = () => {
    const navigate = useNavigate();
    const {
      tokenState:[token, setToken],
      userState:[user, setUser],
      authState:[isAuth, setIsAuth],
      loginState:[isLoggedIn, setIsLoggedIn]
    } = useOutletContext()as
    { tokenState: [string, React.Dispatch<React.SetStateAction<string>>],
      userState: [string, React.Dispatch<React.SetStateAction<string>>],
      authState: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
      loginState: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    }
    
    ;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const theme = useTheme() as CustomTheme;
    //const customColors = tokens(theme.palette.mode);
    // 👇 Default Values
    const defaultValues: ILogin = {
      name: '',
      password: '',
    };
  
    // 👇 The object returned from useForm Hook
    const methods = useForm<ILogin>({
      resolver: zodResolver(loginSchema),
      defaultValues,
    });
  
    // 👇 Submit Handler
    /*const onSubmitHandler: SubmitHandler<ILogin> = (values: ILogin) => {
      console.log(values);
    };
    */
   
    async function onSubmitFormHandler(e: FormEvent<HTMLFormElement>){
      e.preventDefault();
      const inputs = document.querySelectorAll('input');
      const username = inputs[1].value;
      const password = inputs[2].value;
      const user = {username:username, password:password} as unknown as UserType;
      const response = await loginUser(user); 
      console.log(inputs[3].value);
      
      if(response.success){
        setToken(response.data.token);
        setUser(username);
        setIsAuth(true);
        setIsLoggedIn(true);
        if(inputs[3].value ===  'on'){
          setLocalToken(response.data.token);
          setLocalUser(username);
          //setLocalPassword(password);
        }
        navigate("/")
      }
    }
  
    // 👇 JSX to be rendered
    return (
      <Container
        maxWidth={false}
        sx={{ height: '100vh', }}
      >
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{ width: '100%', height: '100%' }}
        >
          <Grid
            item
            sx={{ maxWidth: '70rem', width: '100%',}}
          >
            <FormProvider {...methods}>
              <Grid
                container
                sx={{
                  boxShadow: { sm: '0 0 5px #ddd' },
                  py: '6rem',
                  px: '1rem',
                }}
              >
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
                      autoComplete='off'
                      sx={{ paddingRight: { sm: '3rem' } }}
                      onSubmit={(e)=>{onSubmitFormHandler(e)}}
                    >
                      <Typography
                        variant='h6'
                        component='h1'
                        sx={{ textAlign: 'center', mb: '1.5rem' }}
                      >
                        Log into your account
                      </Typography>
  
                      <FormInput
                        label='Username'
                        type='text'
                        name='username'
                        value={username}
                        onChange={(e)=>{setUsername(e.target.value)}}
                        focused
                        required
                      />
                      <FormInput
                        type='password'
                        label='Password'
                        name='password'
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        required
                        focused
                      />
  
                      <FormControlLabel
                        control={
                          <Checkbox
                            size='small'
                            aria-label='trust this device checkbox'
                            required
                            {...methods.register('persistUser')}
                          />
                        }
                        label={
                          <Typography
                            variant='body2'
                            sx={{
                              fontSize: '0.8rem',
                              fontWeight: 400,
                              color: '#5e5b5d',
                            }}
                          >
                            Trust this device
                          </Typography>
                        }
                      />
  
                      <LoadingButton
                        loading={false}
                        type='submit'
                        variant='outlined'
                        sx={{
                          py: '0.8rem',
                          mt: 2,
                          width: '80%',
                          marginInline: 'auto',
                        }}
                      >
                        Authenticate
                      </LoadingButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant='h6'
                      component='p'
                      sx={{
                        paddingLeft: { sm: '3rem' },
                        mb: '1.5rem',
                        textAlign: 'center',
                      }}
                    >
                      Log in with another provider:
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
                      Need an account?{' '}
                      <LinkItem to='/sign-up'>Sign up here</LinkItem>
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem' }}>
                      Forgot your{' '}
                      <LinkItem to='/forgotPassword'>password?</LinkItem>
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </FormProvider>
          </Grid>
        </Grid>
      </Container>
    );
  };
  
  export default SignInForm;