import { ReactNode } from 'react';


import { Footer } from '../components/footer';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="antialiased w-full text-gray-700">
    {props.meta}

    <div className="max-w-screen mx-auto">

    <div className="text-xl content">{props.children}</div>
    </div>

    <Footer />
    
  </div>
 
);

export { Main };
