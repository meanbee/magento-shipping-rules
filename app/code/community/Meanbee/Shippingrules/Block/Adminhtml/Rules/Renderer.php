<?php

class Meanbee_Shippingrules_Block_Adminhtml_Rules_Renderer
    extends Mage_Adminhtml_Block_Widget_Grid_Column_Renderer_Abstract
{
    public function render(Varien_Object $row)
    {
        $conditions = $row->getConditions();
        return $this->asHtmlRecursive($conditions);
    }
    protected function asHtmlRecursive($condition, $level = 0)
    {
        $clipPoint = Mage::helper('meanship/config')->getClipPointOnGrid(); // Max number of conditions to be shown in combined conditions.
        $collapseLevel = Mage::helper('meanship/config')->getCollapseSubconditionOnGrid();
        if ($condition->getConditions()) {
            $html = '<details'.($level < $collapseLevel ? ' open' : '').'><summary>'.$this->renderCondition($condition).'</summary><ul id="'.$condition->getPrefix().'__'.$condition->getId().'__children" class="rule-param-children" style="padding-left: 1em">';
            foreach ($condition->getConditions() as $i => $child) {
                if ($clipPoint > 0 && $i >= $clipPoint) {
                    $html .='<li>⋮</li>';
                    break;
                }
                $html .= '<li>'.$this->asHtmlRecursive($child, $level + 1).'</li>';
            }
            $html .= '</ul></details>';
        } else {
            $html = $this->renderCondition($condition);
        }
        return $html;
    }
    protected function renderCondition($condition)
    {
        switch ($condition->getAttribute()) {
            case 'dest_country_id':
                $countryHelper = Mage::helper('meanship/country');
                $useEmojiOne = Mage::helper('meanship/config')->getUseEmojiOne();
                $emojiHelper = Mage::helper('meanship/emoji');
                $countryCodes = $condition->getValue();
                $countryNames = explode(', ', $condition->getValueName());
                $listlen = count($countryCodes);
                $countries = array();
                for ($i = 0; $i < $listlen; $i++) {
                    $country = "";
                    switch (Mage::helper('meanship/config')->getCondenseCountriesOnGrid()) {
                        case Meanbee_Shippingrules_Model_Config_Source_CountryCondensation::COUNTRY_CODE:
                            $country .= "<abbr title='{$countryNames[$i]}'>";
                            $country .= $countryCodes[$i];
                            $country .= "</abbr>";
                            break;
                        case Meanbee_Shippingrules_Model_Config_Source_CountryCondensation::REGIONAL_IDENTIFIERS:
                            $country .= "<abbr title='{$countryNames[$i]} ({$countryCodes[$i]})'>";
                            if ($useEmojiOne) {
                                $match = false;
                                $imageCode = $emojiHelper->unicodeToImage($countryHelper->toRegionalIndicatorSymbols($countryCodes[$i]), $match);
                                if ($match) {
                                    $country .= $imageCode;
                                } else {
                                    $country .= $countryCodes[$i];
                                }
                            } else {
                                $country .= $countryHelper->toRegionalIndicatorSymbols($countryCodes[$i]);
                            }
                            $country .= "</abbr>";
                            break;
                        case Meanbee_Shippingrules_Model_Config_Source_CountryCondensation::VERBOSE:
                        default:
                            $country .= $countryNames[$i];
                            break;
                    }
                    array_push($countries, $country);
                }
                return $condition->getAttributeName() . ' ' . $this->renderOperator($condition) . ' ' . join(', ', $countries);
                break;
            case NULL:
                switch ($condition->getType()) {
                    case 'meanship/rule_condition_postalCode':
                        $aggregator = strtoupper($condition->getAggregator());
                        switch (Mage::helper('meanship/config')->getCondenseCountriesOnGrid()) {
                            case Meanbee_Shippingrules_Model_Config_Source_CountryCondensation::COUNTRY_CODE:
                                $value = $condition->getValue();
                                break;
                            case Meanbee_Shippingrules_Model_Config_Source_CountryCondensation::REGIONAL_IDENTIFIERS:
                                $countryHelper = Mage::helper('meanship/country');
                                $useEmojiOne = Mage::helper('meanship/config')->getUseEmojiOne();
                                $emojiHelper = Mage::helper('meanship/emoji');
                                if ($useEmojiOne) {
                                    $match = false;
                                    $imageCode = $emojiHelper->unicodeToImage($countryHelper->toRegionalIndicatorSymbols($condition->getValue()), $match);
                                    if ($match) {
                                        $value = '<abbr title="' . $condition->getValueName() . '">' . $imageCode . '</abbr>';
                                    } else {
                                        $value = $condition->getValue();
                                    }
                                } else {
                                    $value = '<abbr title="' . $condition->getValueName() . '">' .
                                                $countryHelper->toRegionalIndicatorSymbols($condition->getValue()) . '</abbr>';
                                }
                                break;
                            case Meanbee_Shippingrules_Model_Config_Source_CountryCondensation::VERBOSE:
                            default:
                                $value = $condition->getValueName();
                        }
                        return "Postal Code of ${value} matches ${aggregator} of these conditions:";
                    default:
                        return $condition->asString();
                }
            default:
                return $condition->getAttributeName() . ' ' . $this->renderOperator($condition) . ' ' . $condition->getValueName();
        }
    }
    protected function renderOperator ($condition) {
        if (Mage::helper('meanship/config')->getOperatorRenderTypeOnGrid() === Meanbee_Shippingrules_Model_Config_Source_OperatorRenderType::MATHEMATICAL) {
            switch ($condition->getOperator()) {
                case '<':
                    return '<';
                case '>':
                    return '>';
                case '<=':
                    return '≤';
                case '>=':
                    return '≥';
                case '==':
                    return '=';
                case '!=':
                    return '≠';
                default:
                    return $condition->getOperatorName();
            }
        } // else textual
        return $condition->getOperatorName();
    }
}
