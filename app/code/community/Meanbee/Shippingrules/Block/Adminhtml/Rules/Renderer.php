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
                $emojiOne = new Emojione_Client();
                $countryCodes = $condition->getValue();
                $countryNames = explode(', ', $condition->getValueName());
                $listlen = count($countryCodes);
                $countries = array();
                for ($i = 0; $i < $listlen; $i++) {
                    $country = "";
                    switch (Mage::helper('meanship/config')->getCondenseCountriesOnGrid()) {
                        case 'code':
                            $country .= "<abbr title='{$countryNames[$i]}'>";
                            $country .= $countryCodes[$i];
                            $country .= "</abbr>";
                            break;
                        case 'flag':
                            $country .= "<abbr title='{$countryNames[$i]} ({$countryCodes[$i]})'>";
                            if ($useEmojiOne) {
                                $imageCode = $emojiOne->unicodeToImage($countryHelper->toRegionalIndicatorSymbols($countryCodes[$i]));
                                if (preg_match("/<img/", $imageCode)) {
                                    $country .= $imageCode;
                                } else {
                                    $country .= $countryCodes[$i];
                                }
                            } else {
                                $country .= $countryHelper->toRegionalIndicatorSymbols($countryCodes[$i]);
                            }
                            $country .= "</abbr>";
                            break;
                        case 'full':
                        default:
                            $country .= $countryNames[$i];
                            break;
                    }
                    array_push($countries, $country);
                }
                return $condition->getAttributeName() . ' ' . $this->renderOperator($condition) . ' ' . join(', ', $countries);
                break;
            default:
                return $condition->getAttributeName() . ' ' . $this->renderOperator($condition) . ' ' . $condition->getValueName();
        }
    }
    protected function renderOperator ($condition) {
        if (Mage::helper('meanship/config')->getOperatorRenderTypeOnGrid() === 'mathematical') {
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
