import styled from "styled-components";
import {
  width,
  WidthProps,
  space,
  SpaceProps,
  color,
  ColorProps
} from "styled-system";

export const DownloadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const DownloadHeader = styled.div`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
`;

export const DownloadHeaderCell = styled.div<WidthProps>`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  ${width};
`;

export const DownloadRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    flex-direction: row;
  }
`;

export const DownloadIcon = styled.div<ColorProps & SpaceProps>`
  margin-left: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  ${color};
  transition: all 0.2s ease-in;
  ${/*sc-selector*/ DownloadRow}:hover & {
    color: #fff ${color};
  }
  ${space};
`;

export const DownloadCell = styled.div<WidthProps & SpaceProps>`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  ${width};
  ${space};
`;
